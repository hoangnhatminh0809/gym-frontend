const Home = () => {
  return (
    <div className="flex pl-16 flex-col">
      <p className="font-bold text-4xl">
        Home Page
      </p>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[2rem] ml-[2rem] mr-[2rem]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4 flex">
                <div className="pr-5 font-medium text-blue-600 hover:underline cursor-pointer">
                  Edit
                </div>
                <div className="font-medium text-red-500 hover:underline cursor-pointer">
                  Delete
                </div>
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
              <td className="px-6 py-4 flex">
                <div className="pr-5 font-medium text-blue-600 hover:underline cursor-pointer">
                  Edit
                </div>
                <div className="font-medium text-red-500 hover:underline cursor-pointer">
                  Delete
                </div>
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$99</td>
              <td className="px-6 py-4 flex">
                <div className="pr-5 font-medium text-blue-600 hover:underline cursor-pointer">
                  Edit
                </div>
                <div className="font-medium text-red-500 hover:underline cursor-pointer">
                  Delete
                </div>
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Google Pixel Phone
              </th>
              <td className="px-6 py-4">Gray</td>
              <td className="px-6 py-4">Phone</td>
              <td className="px-6 py-4">$799</td>
              <td className="px-6 py-4 flex">
                <div className="pr-5 font-medium text-blue-600 hover:underline cursor-pointer">
                  Edit
                </div>
                <div className="font-medium text-red-500 hover:underline cursor-pointer">
                  Delete
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Home
