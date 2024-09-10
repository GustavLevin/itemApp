export default async function Home() {
  const books = await fetch("http://localhost:3000/api/books/")
    .then((response) => response.json())
    .catch((error) => {
      console.log("failed to get books", error);
    });

  console.log("BOOKS IN FRONTEND", books);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Books
      <section className="flex flex-col items-center justify-center gap-2">
        {books &&
          books.results.map((book) => (
            // <pre>
            //   {JSON.stringify(book,null,2)}
            // </pre>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
              <div className="font-bold text-xl mb-2">{book.title}</div>
              <p className="text-gray-700 text-base">
                <span className="font-semibold">Author:</span> {book.author}
              </p>
              <p className="text-gray-700 text-base">
                <span className="font-semibold">Year:</span> {book.year}
              </p>
              <p className="text-gray-700 text-base">
                <span className="font-semibold">Genre:</span> {book.genre}
              </p>
              <div className="mt-4">
                <p className="text-gray-700 font-semibold">Keywords:</p>
                <ul className="list-disc list-inside">
                  {book.keywords.map((keyword, index) => (
                    <li key={index} className="text-gray-600">
                      {keyword}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </section>
    </main>
  );
}