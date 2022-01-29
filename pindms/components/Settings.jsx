import { Button } from '.';
import TextInput from './TextInput';

function Category({ category, settings, onDelete }) {
  const [name, setName] = React.useState(category.name);
  console.log(name);
  return (
    <TextInput
      value={name}
      onChange={val => {
        category.name = val;
        settings.set(`categories[${category.pos}]`, category);
        setName(val);
      }}
    >
      {name}
      <Button color={Button.Colors.RED} onClick={() => onDelete?.(category.pos)}>
        Delete Category
      </Button>
    </TextInput>
  );
}

export default ({ settings }) => {
  const [categories, setCategories] = React.useState(settings.get('categories', []));

  if (!categories) return null;
  return (
    <div>
      {categories.map(category => (
        <Category
          category={category}
          settings={settings}
          onDelete={idx => {
            categories.splice(idx, 1);
            categories.forEach((e, idx1) => (e.pos = idx1));
            settings.set('categories', categories);
            setCategories(null);
            setTimeout(() => setCategories(categories));
          }}
        />
      ))}
      <Button
        onClick={() => {
          categories.push({ name: 'New Category', dms: [], pos: categories.length, collapsed: false });
          settings.set('categories', categories);
          setCategories(null);
          setTimeout(() => setCategories(categories));
        }}
      >
        Add a category
      </Button>
    </div>
  );
};
