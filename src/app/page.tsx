import Image from 'next/image'

async function getData() {
  const res = await fetch('http://localhost:3001/api/communities/16/posts', { cache: 'no-store' })
  const data = await res.json()
  console.log(data)
}


export default function Home() {
  return (
    <main>
      <div>
        Home
      </div>
    </main>
  )
}
