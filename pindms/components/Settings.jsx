import { persist } from "@cumcord/pluginData";
import { Button } from '.';
import TextInput from './TextInput';

function Category({ category, onDelete }) {
  const [name, setName] = React.useState(category.name);
  return (
    <TextInput
      value={name}
      onChange={val => {
        category.name = val;
        persist.store.categories[category.pos] = category;
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

export default () => {
  const [categories, setCategories] = React.useState(persist.ghost.categories ?? []);

  if (!categories) return null;
  return (
    <div>
      {categories.map(category => (
        <Category
          category={category}
          onDelete={idx => {
            categories.splice(idx, 1);
            categories.forEach((e, idx1) => (e.pos = idx1));
            persist.store.categories = categories;
            setCategories(null);
            setTimeout(() => setCategories(categories));
          }}
        />
      ))}
      <Button
        onClick={() => {
          categories.push({ name: 'New Category', dms: [], pos: categories.length, collapsed: false });
          persist.store.categories = categories;
          setCategories(null);
          setTimeout(() => setCategories(categories));
        }}
      >
        Add a category
      </Button>
    </div>
  );
};
