# section2. Next.js를 소개합니다.

## 1.1) Next 소개

### 특징

- React전용 웹 개발 framework
- 페이지 라우팅, 빌트인 최적화 기능, 다이나믹 HTML 스트리밍
- Vercel에서 개발한 Open Source

### Library vs Framework

**Library**

- React.js, JQuery 등등
- 주도권 : 개발자
  → 기능 구현을 원하는 방향으로 진행
  → 쓰고 싶은 도구, 쓰고싶은 기술 사용 가능
  ex) 리엑트에서 라우팅 처리 할 때
  → react-router or tanstack-router등등 개발자가 선택 가능
  → 어떤 라이브러리르 사용해야하는지 규칙이 없음
- 자유도가 높다.
  → 단점 : 기본 기능 외 제공 X (렌더링 외 제공 X)

**Framework**

- 주도권 : Framework
  → 프레임워크가 제공하는 기능을 이용
  → 허용하는 범위 내에서만 추가 도구 사용 가능
      ex) Next에서 라우팅 처리 할 때
      → Next에서 제공하는 Page Router, App Router 두가지 라우터 중에서만 선택가능
      → 방법은 이미 정해져 있다.
- 자유도가 낮다.
  → 장점 : 거의 모든 기능 제공 (페이지라우터, 최적화(Optimizations), SSR .. 등등)

## 1.2) Next.js 사전 렌더링 이해하기

### 목적

- Next App이 어떠한 원리로 동작하는지 대략적 파악

### 사전 렌더링이란?

- 브라우저의 요청에 사전에 렌더링이 완료된 HTML을 응답하는 렌더링 방식
- React의 CSR의 단점 보완

  - 장점 : 초기 접속 이후에 일어나는 페이지 이동들을 매우 빠른 속도로 쾌적하게 처리가 가능하다.
    1. JS 번들링(자바스크립트 파일들을 하나로 묶은 것)
    2. JS번들링에는 서비스에서 접근 가능한 모든 컴포넌트 코드 존재
    3. 웹사이트에 필요한 전체 코드가 내려오므로, 새로운 페이지 이동 시 페이지 요청 처리가 필요없어지게 된다.
    4. 따라서 브라우저가 자체적으로 리액트 앱을 실행해서 이동해야하는 페이지의 컴포넌트를 갈아 끼우므로 빠른 속도로 처리가 된다.
  - 단점 : FCP(초기 접속 속도)가 느리다.
    FCP(First Contentful Paint) : 요청시작 시점부터 컨텐츠가 화면에 처음 나타나는데 걸리는 시간
    → 요청 시작 - 컨텐츠 렌더링

    - FCP 지표가 중요한 이유?
      → 초 단위마다 이탈률이 상당히 증가한다.

  - CSR의 처리 방식
    - 브라우저에서 리액트 앱을 실행해서 렌더링을 브라우저 차원에서 처리하는 방식
    - 프로세스
      1. 유저가 브라우저를 통해 초기 접속 요청을 서버에 보내면
      2. 리엑트 웹서버는 빈 껍데기인 index.html을 브라우저에 보내준다.
      3. 브라우저는 처음에 빈 화면 렌더링
      4. 빈 화면이 노출되는 것을 최소화 하기위해 서버는 브라우저에 리액트 앱을 만들기 위한 모든 자바스크립트 파일을 번들링(하나의 파일로 묶어서 → JS Bundle)해서 후속으로 브라우저에 전달
      5. 브라우저는 번들링된 자바스크립트 파일인 리액트 앱을 직접 실행한다.
      6. 리액트앱을 실행한 후에 리액트 컴포넌트들이 실제로 화면에 노출된다.

- 사전 렌더링 프로세스
  1.  접속 요청
      → 유저가 브라우저를 통해 서버로 접속 요청
  2.  JS 실행 (렌더링)
      → JS 실행 렌더링 : 자바스크립트 코드(React컴포넌트)를 HTML로 변환하는 과정
      → 서버에서 리액트 앱을 직접 실행 시켜서 리엑트 컴포넌트들을 HTML로 변환, 사전에 렌더링을 수행
  3.  렌더링 된 HTML 응답
      → 서버에서 미리 렌더링이 완료된 HTML파일을 브라우저에 응답
  4.  화면 렌더링 (FCP)
      → 화면 렌더링 : HTM코드를 브라우저가 화면에 그려내는 작업
      → 브라우저는 렌더링이 완료된 HTMl파일을 그대로 화면에 렌더링하여 사용자는 완성된 화면을 볼 수 있다.
          ⇒ **JS코드가 없는 상태이므로 상호작용은 아직 불가능하다.**
  5.  JS Bundle
      → 서버는 후속으로 리액트 앱(자바스크립트 코드)를 번들링해서 브라우저에 보내준다.
  6.  수화 Hydration
      → 브라우저는 리엑트 앱을 직접 실행하여 화면에 렌더링 되어있는 HTML요소들과 연결 (Hydration)
  7.  상호작용 가능
      → Hydration(수화)이 되어야지만 상호작용까지 가능한 상태가 된다.
      → TTI(Time To Interactive - hydration 종료 되는 시간) 지표로 표현 가능
  8.  페이지 이동의 경우 CSR과 동일한 방식으로 컴포넌트만 교체되는 방식으로 동작하게 된다. (5번에서 JS Bundle - React App을 보내준 것)

# section3. Page Router 핵심 정리

## 2.1) Page Router를 소개합니다.

### 순서

- Page Router 소개
- Page Router버전의 Next.js App 만들기

### Page Router

- Pages 폴더 기준으로 파일, 폴더 이름을 기반으로 페이지 라우팅 자동으로 제공
- 동적 경로인 경우 `[${파일명}]` 대괄호안에 파일명을 넣어주면 동적 경로에 대응하는 페이지의 역할을 한다.

### 실습

### `npx create-next-app@14 section02`

- `npx` : Node Package Executor
  → 라이브러리들이 실제 올라가 있는 서버 npmjs.com에 등록되어있는 최신 버전의 노드 패키지를 다운로드 없이 바로 실행시키는 명령어
- `create-next-app@14`
  → Next의 공식문서에서 안내하고 있는 Next.App을 생성하는 노드.js 패키지
  → 보일러 플레이트 같은것 (snippet처럼 코드 조각같은 것)
  → `@14` 현재 설치하려는 Next App을 14버전으로 설치하라는 것
- `section02`
  → 패키지 이름

### `_app.tsx`

- Next.js의 앱 컴포넌트는 모든 페이지 컴포넌트들의 부모역할을 하는 **루트 컴포넌트**
- 전체 페이지에 공통적으로 포함되는
  **헤더 컴포넌트,** **레이아웃 렌더링,** **비즈니스 로직**을 작성할 수 있는 공간

### `_document.tsx`

- 모든 페이지에 공통적으로 적용이 되어야하는 Next.js앱의 HTML코드를 설정하는 컴포넌트
- 리엑트의 index.html과 동일
- 메타태그 설정, 폰트 호출, 캐릭터셋 설정, 구글 애널리틱스 같은 서드파티 스크립트를 넣을 때 설정하는 페이지
- 페이지 전체에 다 적용되는 HTML태그를 관리하기 위한 페이지

### `next.config.mjs`

- 넥스트 앱의 설정 관리 파일
- `reactStrictMode`
  - true인 경우
    → 리액트 앱에 존재하는 잠재적인 문제를 검사하기 위해 개발모드로 실행 시 컴포넌트를 두번 실행하는 설정
    → 따라서 콘솔 찍을 때 디버깅 할 때 어려움이 있다.

### `useRouter()`

- query string으로 파라미터 전달해야할 때 사용
- `next/router`에서 import 해야만 page router에서 사용 가능하다.
- `useRouter()` hook은 객체를 반환하므로 변수에 저장시 router객체가 저장된다.

```tsx
import {useRouter} from 'next/router'

export default function Page() {
  const router = useRouter()

  console.log('router : ', router)

  return <h1>Search</h1>
}
```

- console이 2번 찍히는 이유?
  → Next app이 query string을 읽는 과정 중에 컴포넌트를 1번 더 호출하기 때문
  → 1번째 호출 시 router객체 중 query 값의 빈 객체만 있다.
  → 2번째 호출 시 query 값이 `{q: 'test'}` 로 들어가 있는게 보여진다.
- query string은 페이지 경로에 영향을 주지 않기에 따로 설정이 필요없고, useRouter 훅으로 처리가 가능하다.

### `동적 경로 (URL Parameter)`

- `localhost:3000/book/100`
  - `/` 로 path에 값을 넣는 형태
- `book/[id].tsx`
  - 대괄호 안에 넣은 값을 url의 `/book/{id}` 로 id에 어떤 값이 들어와도 동적페이지로 인식하여
  - [id].tsx 파일을 렌더링한다.

### `Catch All Segment`

- `book/[...id].tsx`
  - 범용적인 페이지를 만들고 싶을 때 대괄호 안에 `…` 을 넣어준다.
  - ex) `localhost:3000/book/1/2/3/4/5/`
  - 위에 처럼 URL이 들어왔을 때 모든 id에 대응한다.
  - catch All Segment : `/` 로 대응되는 모든 구간을 대응하는 페이지로 만들때 catch All Segment로 부른다.
- 대응할 수 없는 경로
  - `localhost:3000/book` → 대응 불가
  - 대응 불가 이유
    → parameter로 어떤값이 와야지만 대응이 가능하다.

### `Optional Catch All Segment : [[...id]].tsx`

- `localhost:3000/book` 와 `localhost:3000/book/1/2/3/4/5/` 모두 대응이 가능한 페이지가 된다.
- Catch All Segment로 된 파일을 대괄호로 한번 더 감싼 파일

## 2.3) 네비게이팅

`<Link href={}></Link>`

- Next 내장 컴폰넌트로 `<a>` 태그와 동일한 역할을 한다.
- 내장 컴포넌트 사용을 하는게 더 좋다.

### 프로그래매틱한 페이지 이동 (Programmatic Navigation)

- 프로그래매틱하게 페이지 이동시킨다는 말은?
  → 사용자가 링크를 직접 클릭했을 때 페이지를 이동시키는 방식이 아닌
  → 특정 버튼이 클릭이 되었거나 아니면 특정 조건이 만족했을 경우에 어떠한 함수 내에서 페이지를 이동 시키는 방법

### `router.push()`

- 인수로 전달받은 경로로 페이지를 CSR 방식으로 페이지가 이동 된다.

### `router.replace()`

- 뒤로가기를 방지하며 페이지 이동

### `router.back()`

- 뒤로가기 시키는 메서드

## 2.4) 프리페칭 Pre-Fetching

- Pre-Fetching : 페이지를 사전에 불러올 때 사용
- 개발환경에서는 동작하지 않고, build 한 후 build 된 것을 실행해야 Pre-Fetching이 잘 돌아가는 것을 확인할 수 있다.
  - `npm run build` → `npm run start`
  - 페이지 이동 시 프리패칭 처리 되다가 다시 불러오는 이유는 캐시가 만료되었기 때문이다.
  - `Link` 컴포넌트로 명시된 경로가 아니라면 프리패칭이 이뤄지지 않는다.
- 링크를 통해 이동해야하는 페이지를 미리 불러오도록 Next는 처리한다.
  → 웹페이지 내부의 링크를 클릭하기 전에 현재 페이지에서 이동이 가능한 모든 페이지들에 필요한 데이터를 미리 다 불러와 놓음으로써 이동을 매우 빠른 속도로 지체 없이 처리하기 위한 것
- Next의 경우 초기 접속 요청이 완료가 되어서 페이지가 렌더링이 됐는데 추가적인 데이터를 왜 사전에 불러와야 하는가?
  → Next는 자바스크립트 코드(리액트 컴포넌트)들을 자동으로 페이지별로 스플리팅 해서 페이별로 분리해서 저장을 미리 한다.
- 사전 렌더링 과정에서 JS번들 파일을 전달 할 때, 현재 페이지에 필요한 JS Bundle만 전달 된다.
  → 모든 페이지에 필요한 자바스크립트 코드가 전달되는게 아닌!
- 특정 요청에 대한 파일들만 전달되는 이유?
  → JS Bundle을 전달할 때 코드 양을 줄여, 초기 접속 요청이 있을 때 모든 페이지에 대한 파일을 번들링 할 때 브라우저가 느려지게 된다.
  → Hydration 과정도 오래되므로, TTI를 줄이기 위한 방법이다.
- 따라서, 페이지 이동 시 자바스크립트를 불러오는 방식이므로, Pre-Fetching이 추가로 적용이 되는 것이다.
  - Pre Fetching이 없었다면
    → 초기 접속 때 페이지에 필요한 JS를 번들링 해오므로 용량이 작아 초기 접속은 빠르더라도,
    → 다른 페이지 이동 시 또 다시 번들링 처리가 필요하여 비효율적인 페이지 이동이 발생한다.
  - Pre Fetching이 있기에
    → 페이지 이동 요청이 발생하기 전에 미리 불러와 놓으므로 페이지 이동을 훨씬 빠르게 동작할 수 있게 만들어졌다.
- 프로그래매틱한 코드도 프리패칭 하고 싶다면?

  - 특정 함수에 페이지 처리가 되면 프리패칭 적용이 안된다.
  - 라우터 객체 `useRouter()` 의 특정 메서드를 통해서 직접 프로그래메틱하게 페이지를 프리패칭하도록 코드 작성을 하면 된다.
    → 마운트 되었을 때 실행하는 프리패치가 되어야하는 페이지를 넣어주면 된다.

  ```
  import '@/styles/globals.css'
  import type {AppProps} from 'next/app'
  import Link from 'next/link'
  import { useRouter } from 'next/router'
  import { useEffect } from 'react'

  export default function App({Component, pageProps}: AppProps) {

    const router = useRouter()

    const onClickButton = () => {
      router.push('/test')
    }

    useEffect(() => {
      router.prefetch('/test') //특정 요청을 명시적으로 처리 가능
    }, [])

    return (
      <>
        <header>
          <Link href={'/'}>index</Link>
          &nbsp;
          <Link href={'/search'}>search</Link>
          &nbsp;
          <Link href={'/book/1'}>book/1</Link>
          <div>
            <button onClick={onClickButton}>/test 페이지 이동</button>
          </div>
        </header>
        <Component {...pageProps} />
      </>
    )
  }

  ```

- `Link` 컴포넌트는 자동으로 프리패칭을 하는데, 프리패칭을 안하고 싶다면
  `<Link href={'/search'} prefetch={false}>search</Link>`
  → prefetch값을 Link에 넣어주면 된다.

## 2.5) [API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)

- Next.js 앱에서 API를 구축할 수 있게 해주는 기능
  → 간단한 API 구축 가능
- `src/pages/api` 폴더 안에 `test.ts` 처럼 넣어주면 된다.
  ```tsx
  // src/pages/api/time.ts

  // import한 값이 type이라서 더 디테일하게 type을 넣어 명시한다.
  import type {NextApiRequest, NextApiResponse} from 'next'

  export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const date = new Date()
    res.json({time: date.toLocaleString()})
  }

  // npm run dev 실행하여 확인 시
  // http://localhost:3000/api/time로 접근
  // 결과 : {"time":"2025. 11. 27. 오후 9:28:29"}
  ```

## 2.6) 스타일링

### inline style

```tsx
export default function Home() {
  return <h1 style={{color: 'red'}}>index</h1>
}
```

- 인라인 스타일의 단점
  - 컴포넌트의 HTML요소가 많아질수록 가독성이 떨어진다.
- CSS 파일 분리해서 관리
  - 단, \_app.tsx 외에 다른 파일에서 css파일을 import를 하면 error가 생긴다.
  ```tsx
  // index.css
  import './index.css'

  export default function Home() {
    return <h1 style={{color: 'red'}}>index</h1>
  }

  /* error
  Global CSS cannot be imported from files other than your Custom <App>. Due to the Global nature of stylesheets, and to avoid conflicts, Please move all first-party global CSS imports to pages/_app.js. Or convert the import to Component-Level CSS (CSS Modules).
  Read more: https://nextjs.org/docs/messages/css-global
  Location: src/pages/index.tsx
  
  Import trace for requested module:
  ./src/pages/index.css
  */
  ```
  - import를 제한하는 이유는?
    → 다른 페이지에 작성된 css 코드와 충돌을 일으킬 수 있기 때문이다.
    → 페이지별로 사용되는 css에 정의된 스타일의 클래스명이 겹치게 되면 css파일이 브라우저에 같이 로딩이되어 충돌을 일으킨다.
    따라서, 클래스명이 겹치지 않게 하면되는데 불가능 하다.
        ```tsx
        // index.css
        .h1 {
        	color: red
        }

        // test.css
        .h1 {
        	color: blue
        }

        // index.css 파일과 test.css파일이 브라우저에 함께 로딩이 되어 클래스명이 충돌 된다.
        ```

        → 따라서, Next.js는 별도의 페이지 파일이나 또는 어떠한 컴포넌트 파일에서 별도의 CSS파일을 import 하는 것을 제한한다/
        → 단, __app.tsx의 경우 예외적으로 global.css만 import할 수 있다. 다른 컴포넌트들의 부모 컴포넌트이기 때문이다.

### CSS Module

- CSS파일에 작성한 클래스명들을 다른 CSS파일과 중복되지 않도록 자동으로 클래스명을 유니크하가 변경해준다.
- CSS 모듈 사용하는 이유
  → Next의 경우 별도의 파일이나 페이지에서 CSS import하는 것을 원천 차단하므로 `_app.tsx`를 제외하고 css를 import 하지 못하기 때문이다.
- 파일명 변경
  - 기존 : `index.css` → 에러 발생
  - 모듈 변경 : `index.module.css`
  ```tsx
  // src/pages/index.module.css
  .h1 {
  	color: red
  }

  // src/pages/index.tsx
  import style from './index.module.css'

  export default function Home() {
    return (
      <h1 className={style.h1}>
        index
      </h1>
    );
  }

  ```
  → `style.h1` 이 유니크한 클래스명으로 변경된다.
  → 개발자 도구로 확인 된 class명 : `<h1 style="" class="index_h1__JHo3j">index</h1>`

## 2.7) 글로벌 레이아웃 설정하기

- Next 모든 페이지에 다 적용되는 글로벌 레이아웃을 설정하는 방법

```tsx
// 최상단 부모 컴포넌트 - src/pages/_app.tsx
import GlobalLayout from '@/components/global-layout'
import '@/styles/globals.css'
import type {AppProps} from 'next/app'

export default function App({Component, pageProps}: AppProps) {
  return (
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  )
}

// 글로벌 레이아웃 컴포넌트 - src/components/global-layout.tsx
import Link from 'next/link'
import {ReactNode} from 'react'
import style from './global-layout.module.css'

export default function GlobalLayout({children}: {children: ReactNode}) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href={'/'}>📚 ONEBITE BOOKS</Link>
      </header>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>제작 @kiki</footer>
    </div>
  )
}

// 글로벌 레이아웃 컴포넌트에 필요한 css module
// src/components/global-layout.module.css
.container {
  background-color: white;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;

  box-shadow: rgba(100, 100, 100, 0.2) 0px 0px 29px 0px;
  padding: 0 15px;
}

.header {
  height: 60px;

  font-weight: bold;
  font-size: 18px;
  line-height: 60px;
}

.header > a {
  color: black;
  text-decoration: none;
}

.main {
  padding-top: 10px;
}

.footer {
  padding: 100px 0;
  color: gray;
}
```

## 2.8) 페이지별 레이아웃 설정하기

### search bar

- 조건 : 책 리스트에만 노출되어야한다.
- 전역으로 관리하기위해 global layout 설정

```tsx
// src/components/searchable-layout.tsx
import {ReactNode} from 'react'

export default function SearchableLayout({children}: {children: ReactNode}) {
  return (
    <div>
      <div>임시 서치바</div>
      {children}
    </div>
  )
}
```

### `getLayout()`

- 페이지 매개변수로 현재의 페이지 역할을 할 컴포넌트를 받아와서 별도의 레이아웃으로 감싸진 형태의 페이지(레이아웃이 적용된 페이지)를 리턴해주는 함수
- `getLayout` 메서드를 호출하고 인수로 어떤한 페이지 컴포넌트를 전달하면 해당 페이지 컴포넌트를
  `<SearchableLayout></SearchableLayout>` 와 같은 레이아웃에 묶어서 리턴해준다.

```tsx
import SearchableLayout from '@/components/searchable-layout'
import style from './index.module.css'
import {ReactNode} from 'react'

export default function Home() {
  return (
    <>
      <h1 className={style.h1}>index</h1>
      <h2 className={style.h2}>h2</h2>
    </>
  )
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}

// ❌❌❌❌ 기존 global-layout.tsx를 감싼 것처럼 하면 안된다! ❌❌❌❌❌
// src/pages/_app.tsx
import GlobalLayout from '@/components/global-layout'
import SearchableLayout from '@/components/searchable-layout'
import '@/styles/globals.css'
import type {AppProps} from 'next/app'

export default function App({Component, pageProps}: AppProps) {
  return (
    <GlobalLayout>
      <SearchableLayout>
        {' '}
        ❌이렇게 감싸면 전 페이지에 적용되므로 안됨!!!❌
        <Component {...pageProps} />
      </SearchableLayout>{' '}
      ❌이렇게 감싸면 전 페이지에 적용되므로 안됨!!!❌
    </GlobalLayout>
  )
}
```

### 함수에 메서드를 어떻게 추가할 수 있을까?

- 자바스크립트의 모든 함수는 사실 모두 다 객체이다.
- 따라서 메서드를 추가할 수 있다.
  → Home컴포넌트에 별도의 레이아웃이 적용되길 원하면 `getLayout`메서드를 추가해서 설정하면 1. \_app.tsx에 전역으로 적용되어야하는 레이아웃 안에 Component로 페이지를 받는데, 2. Home도 그 컴포넌트 안에 속하게되어 Home을 호출하면 Home안의 메서드도 호출된다.

```tsx
// src/pages/_app.tsx
import GlobalLayout from '@/components/global-layout'
import '@/styles/globals.css'
import type {AppProps} from 'next/app'

export default function App({Component, pageProps}: AppProps) {
  const getLayout = Component.getLayout

  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
}
```

### `Component` props

- Home 컴포넌트 같은 것으로 Props로 전달 받는다.
- Component는 함수로 객체이기 때문에 메서드를 추가 할 수 있다.

```tsx
export default function Home() {
  return (
    <>
      <h1 className={style.h1}>index</h1>
      <h2 className={style.h2}>h2</h2>
    </>
  )
}

// 메서드 추가
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
```

- \_app 컴포넌트에서 전달 받았을 때
  `const getLayout = Component.getLayout` 이렇게 꺼내와서 사용할 수 있다.
- `return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>`
  → 중괄호와 함께 호출하는 형태로 별도의 레이아웃을 적용할 수 있다.

### Component.getLayout의 단점

- 가장 부모컴포넌트인 app 컴포넌트에서 Component.getLayout으로 사용하는 방식은
  getLayout을 적용하지 않은 페이지에서 타입 에러가 발생하게 된다.

![image.png](attachment:20c05984-2399-4178-96d6-0940c612d5c4:image.png)

- getLayout이 없는 컴포넌트는 예외처리를 해줘야한다.
  → page를 매개변수로 받아서 리턴해주는 함수를 넣어주면 된다.
      ```tsx
      import GlobalLayout from '@/components/global-layout'
      import '@/styles/globals.css'
      import type {AppProps} from 'next/app'
      import {ReactNode} from 'react'

      export default function App({Component, pageProps}: AppProps) {
        const getLayout = Component.getLayout ?? ((page: ReactNode) => page)

        return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
      }

      ```

      - `((page: ReactNode) => page)` 페이지를 그대로 넘기는 함수를 적용하더라도
      `getLayout(<Component {...pageProps} />)` 이렇게 렌더링을 하도록 설정해주어도,
      페이지 컴포넌트가 그대로 화면에 렌더링이 되기에 문제가 없다.

### getLayout은 기존의 Next에서 제공되는 함수가 아니므로 type설정을 해줘야한다.

- 즉, getLayout은 App컴포넌트가 받는 컴포넌트 props인 component의 원래 정의된 함수가 아니라는 것이다.
- 따라서, 기존 Next에서 제공하는 함수를 통해 확장해서 타입정의를 다시 해줘야한다.
  ```tsx
  // src/pages/_app.tsx

  import GlobalLayout from '@/components/global-layout'
  import '@/styles/globals.css'
  import {NextPage} from 'next'
  import type {AppProps} from 'next/app'
  import {ReactNode} from 'react'

  // 타입 재정의
  type NextPageWithLayout = NextPage & {
    // 없을수도 있어서 옵셔널한 타입으로 해줘야한다. book페이지에서는 없으므로
    getLayout?: (page: ReactNode) => ReactNode
  }

  // props의 Component 확장
  export default function App({
    Component,
    pageProps,
  }: AppProps & {Component: NextPageWithLayout}) {
    const getLayout = Component.getLayout ?? ((page: ReactNode) => page)

    return (
      <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
    )
  }
  ```

### `React.ChangeEvent<HTMLInputElement>`

- 타입의 의미
  - 리텍트에서 발생한 체인지 이벤트 객체 타입
  - 어떤 태그에서 발생했나면? HTMLInputElement에서 발생한 이번트 타입이다.
