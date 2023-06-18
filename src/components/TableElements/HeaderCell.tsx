function HeaderCell({ text }: { text: string }) {
  return (
    <th className='text-lg tracking-wide text-center text-white font-bold uppercase border-r border-b py-2'>
      {text}
    </th>
  )
}

export default HeaderCell
