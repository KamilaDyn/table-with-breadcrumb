const ListItem = ({ spanText, text }: { spanText: string; text: string }) => (
  <li>
    <span className='text-red-900 text-base lg:text-lg font-bold '>{spanText}: </span>
    {text}
  </li>
)

export default ListItem
