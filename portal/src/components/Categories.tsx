export default function Categories({ categories }: { categories?: string[] }) {
  return (
    <div className="categories">
      {categories?.map((name) => (
        <span key={name}>{name}</span>
      ))}
    </div>
  );
}
