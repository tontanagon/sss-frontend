"use client";
export default function textPage() {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await fetch("http://localhost:7129/api/create-category", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    
  };
  return (
    <div className="container mx-auto px-4">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="name">name</label>
        <input name='name' type="text" className="border "/>

        <label htmlFor="status">status</label>
        <input name='status' type="text" className="border "/>

        <label htmlFor="image">image</label>
        <input id="image" name='image' type="file" className="border "/>

        <button type="submit">submit</button>
      </form>
    </div>
  );
}