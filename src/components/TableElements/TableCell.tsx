function TableCell({ text }: { text: string }) {
  return (
    <td className='p-2 text-md text-gray-700 hover:white min-w-[50px] lg:min-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[150px] 2xl:max-w-[200px] break-words text-left px-4'>
      {text}
    </td>
  )
}

export default TableCell
