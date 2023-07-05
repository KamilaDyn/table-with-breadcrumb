function Loading({ message }: { message: string }) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900'></div>
      {message && <div className='mt-4 text-gray-700'>{message}</div>}
    </div>
  )
}

export default Loading
