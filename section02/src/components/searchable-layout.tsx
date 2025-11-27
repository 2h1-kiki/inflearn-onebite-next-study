import {useRouter} from 'next/router'
import {ReactNode, useEffect, useState} from 'react'
import style from './searchable-layout.module.css'

export default function SearchableLayout({children}: {children: ReactNode}) {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const q = router.query.q as string

  useEffect(() => {
    setSearch(q || '')
  }, [q])

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSubmit = () => {
    // query string과 search한 값과 동일하면
    // enter key를 눌러도 새로고침이 안되도록 q === search 추가
    if (!search || q === search) return
    router.push(`/search?q=${search}`)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          type="text"
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세요..."
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  )
}
