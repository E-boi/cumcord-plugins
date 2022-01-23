import { Arrow, Button, close, ForkSvg, Modal, Spinner, StarSvg, Text } from '../components';
import FileModal from './FileModal';
import FolderModal from './FolderModal';
import SelectInput from './SelectInput';
import { webpack } from '@cumcord/modules';

const wumpus = {
  ...webpack.findByProps('emptyStateImage', 'emptyStateSubtext'),
};

const imageTypes = ['png', 'jpg'];

export default ({ url, key, transitionState }) => {
  const [rootDir, setRootDir] = React.useState();
  const [repoInfo, setInfo] = React.useState();
  const [folder, setFolder] = React.useState();
  const [file, setFile] = React.useState();
  const [branches, setBranches] = React.useState();
  const [selectedBranch, changeBranch] = React.useState();
  const [err, setError] = React.useState();
  if (!repoInfo)
    getRepo(url, key)
      .then(e => {
        changeBranch(e.default_branch);
        setInfo(e);
      })
      .catch(e => setError(e.message));
  if (repoInfo && !rootDir) getRootDir(url, selectedBranch, key).then(e => setRootDir(e));
  if (!branches) getBranches(url, key).then(b => setBranches(b));

  let path;
  if (folder && !file) {
    const dir = folder[0]?.path.split('/');
    path = folder[0].path.replace(`/${dir[dir.length - 1]}`, '');
  } else if (file) path = file.path;

  return (
    <Modal.ModalRoot transitionState={transitionState} className={`githubModel ${file ? 'infile' : ''}`}>
      <Modal.ModalHeader>
        <a className='repo-name' href={repoInfo?.html_urk || `https://github.com/${url}`} target='_blank'>
          {repoInfo?.name || url}
        </a>
        {repoInfo && (
          <a className='star-svg' href={`${repoInfo.html_url}/stargazers`} target='_blank'>
            <img src={StarSvg} />
            <p>{repoInfo.stargazers_count}</p>
          </a>
        )}
        {folder && !file && (
          <div
            className='back-outfile'
            onClick={() => {
              const goBack = back(folder);
              if (!goBack) setFolder(null);
              getFolder(url, goBack, selectedBranch, key).then(e => setFolder(e));
            }}
          >
            <Arrow direction='LEFT' />
          </div>
        )}
        {file && (
          <div className='back-outfile' onClick={() => setFile(null)}>
            <Arrow direction='LEFT' />
          </div>
        )}
        {branches && (
          <SelectInput
            className='Gbranches'
            value={selectedBranch}
            onChange={({ value }) => {
              if (selectedBranch === value) return;
              setFolder(null);
              setFile(null);
              changeBranch(value);
              getRootDir(url, value, key).then(e => setRootDir(e));
            }}
            options={branches.map(branch => ({ label: branch.name, value: branch.name }))}
          />
        )}
      </Modal.ModalHeader>
      <Modal.ModalContent>
        {err && (
          <div className='Gerror'>
            <div className={wumpus.emptyStateImage} />
            <p className={`Gerror-text ${wumpus.emptyStateSubtext}`}>{err}</p>
          </div>
        )}
        {!repoInfo && !err && (
          <p className='Gfetching'>
            Getting repo
            <Spinner type='wanderingCubes' />
          </p>
        )}
        {rootDir && !folder && !err && !file && (
          <FolderModal
            dir={rootDir}
            onClick={(to, type) =>
              type === 'folder' ? getFolder(url, to, selectedBranch, key).then(e => setFolder(e)) : getFile(rootDir, to).then(e => setFile(e))
            }
          />
        )}
        {folder && !err && !file && (
          <FolderModal
            dir={folder}
            onClick={(to, type) =>
              type === 'folder' ? getFolder(url, to, selectedBranch, key).then(e => setFolder(e)) : getFile(folder, to).then(e => setFile(e))
            }
            path={path}
          />
        )}
        {file && !err && <FileModal file={file} path={path} />}
      </Modal.ModalContent>
      <Modal.ModalFooter>
        <Button onClick={() => close()}>Close</Button>
        {repoInfo && (
          <div className='repo-info'>
            <a className='owner-profile' href={repoInfo.owner.html_url} target='_blank'>
              <img height={32} width={32} src={repoInfo.owner.avatar_url} />
              <p>{repoInfo.owner.login}</p>
            </a>
            <a className='fork-svg' href={`${repoInfo.html_url}/network/members`} target='_blank'>
              <img src={ForkSvg} />
              <p>{repoInfo.forks}</p>
            </a>
          </div>
        )}
      </Modal.ModalFooter>
    </Modal.ModalRoot>
  );
};

function back(dir) {
  const folder = dir[0].path.split('/');
  if (folder.length === 2) return;
  return dir[0].path.replace(`/${folder[folder.length - 2]}/${folder[folder.length - 1]}`, '');
}

async function getBranches(url, key) {
  const branches = await fetch(`https://api.github.com/repos/${url}/branches?per_page=100`, { headers: key && { Authorization: `token ${key}` } });
  if (!branches.ok) return;
  const json = await branches.json();
  return json;
}

async function getRepo(url, key) {
  const repo = await fetch(`https://api.github.com/repos/${url}`, { headers: key && { Authorization: `token ${key}` } });
  if (!repo.ok) throw Error((await repo.json()).message);
  const json = await repo.json();
  return json;
}

async function getRootDir(url, branch, key) {
  const repo = await fetch(`https://api.github.com/repos/${url}/contents?ref=${branch}`, { headers: key && { Authorization: `token ${key}` } });
  if (!repo.ok) return;
  const json = await repo.json();
  const folders = json.map(e => e.type === 'dir' && e).filter(e => e);
  const files = json.map(e => e.type === 'file' && e).filter(e => e);
  return [...folders, ...files];
}

async function getFolder(url, folder, branch, key) {
  const folderF = await fetch(`https://api.github.com/repos/${url}/contents/${folder}?ref=${branch}`, {
    headers: key && { Authorization: `token ${key}` },
  });
  if (!folderF.ok) return;
  const json = await folderF.json();
  const folders = json.map(e => e.type === 'dir' && e).filter(e => e);
  const files = json.map(e => e.type === 'file' && e).filter(e => e);
  return [...folders, ...files];
}

async function getFile(folderS, fileName) {
  const file = folderS.filter(f => f.type === 'file' && f.name === fileName);
  const type = fileName.split('.');
  const isImage = imageTypes.includes(type[type.length - 1]);
  if (file.length === 0) return;
  if (isImage) return { path: file[0].path, content: file[0].download_url, type: type[type.length - 1], isImage };
  const fileReq = await fetch(file[0].download_url);
  const content = await fileReq.text();
  return { path: file[0].path, content, type: type[type.length - 1], isImage };
}
