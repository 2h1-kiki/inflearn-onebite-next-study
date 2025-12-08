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

    ````tsx
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
    ````

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

  ````tsx
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
  ````

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

## 2.9) 한입북스 UI 구현하기

`.cover_img_container**::before**`

- before 요소는 css상에서 특별한 스타일링이나 어떠한 요소에 데코레이션을 넣어주기 위한 가상으로 존재하는 요소를 하나 만드는 방식
- 스타일링만을 위해 사용되는 기능

## 2.10) 사전 렌더링과 데이터 페칭

### 기존 리액트앱에서 데이터 패칭하는 방식

![image.png](attachment:3e00e3d8-07c7-4ccb-8d9e-3844fa47984b:e4b29bc2-1c79-4401-b04a-2e9ad1a66e99.png)

![image.png](attachment:cf2230ab-1f3b-4508-a589-81ff74636e51:a1303543-4686-44c0-aa36-311a98f5cb4e.png)

- 딘점 : 초기 접속 요청부터 데이터 로딩까지 오랜시간이 걸림
  → 데이터 요청이 3. 컴포넌트 마운트 시점에 fetchData호출을 하므로 요청 자체가 늦게 시작한다.

![image.png](attachment:09c82703-ef2a-4d10-baba-1087a2d5243f:image.png)

- 브라우저가 html렌더링과 후속으로 받는 JS도 실행해야하므로 FCP가 늦어진다.
  → 따라서 초기 접속이 느린 리액트에서 컴포넌트가 `useEffect` 가 마운트 된 이후가 되서야 백엔드 서버에 데이터 요청하도록 코드를 작성하면
  → FCP이후에 API 요청을 하게된다.
- 따라서, 사용자는 초기 렌더링이 느린데 로딩바도 기다려야하는 상황이 발생할 수도 있다.

## 사전 렌더링

![image.png](attachment:452af2b6-4945-4b1a-a375-f714c57fcd9e:image.png)

- 사전 렌더링 : 사용자 접속 후 서버에서 JS를 실행하고 렌더링된 완선된 HTML을 브라우저에 응답하는 방식
  → React의 FCP가 느린 단점을 보완한 렌더링 방식
- 이때 JS 실행(렌더링)하면서 데이터를 미리 불러올 수 있도록 설정이 가능하다.
  ![image.png](attachment:9b7b1952-ae00-4e5e-a7bd-6b6ffad62a69:206ea8ee-db3d-4889-b611-ee3ae623ae5a.png)
  → 따라서 Next는 훨씬 빠른 시간에 데이터를 불러올 수 있어, 데이터패칭이 완료된 페이지를 사용자에 노출 할 수 있게 되었다.
  - 단, 서버에서 사전렌더링(JS 실행)에서 데이터를 갖고 올 때 오래걸리게 되면 Build TIme에 미리 맞출수도 있다.

### 따라서 사전렌더링 방식은

### 1. 서버사이드 렌더링(SSR)

- 가장 기본적인 사전 렌더링 방식
- 요청이 들어올 때 마다 사전 렌더링을 진행 함

### 2. 정적 사이트 생성(SSG)

- 빌드 타임에 미리 페이지를 사전 렌더링 해줌
  → 오래 걸릴 것으로 예상되는 페이지를 빌드 타임에 렌더링 하는 방식

### 3. 증분 정적 재생성(ISR)

- 향후에 다룰 사전 렌더링 방식

## 2.11) SSR 소개 및 실습

- Server Side Rendering
- 브라우저에 접속 요청이 들어올 때마다 매번 계속해서 새롭게 페이지를 사전렌더링 하는 방식

### `getServerSideProps`

```tsx
// 함수를 적어주는 것만으로도 사전에 렌더링을 하는 SSR 페이지가 된다.
export const getServerSideProps = () => {
	// 페이지 역할을 하는 컴포넌트보다 먼저 실행 되어 해당 컴포넌트에 필요한 데이터를 미리 불러오는 함수
}

export default function Home() {
...
}
```

→ 페이지 파일에 getServerSideProps 함수로 만들어서 export 하면 SSR로 동작 하도록 Next에 설정 되어있다.

- 순서
  1. 사용자가 `localhost:3000` 으로 Home을 요청
  2. 해당 페이지 안에 `getServerSideProps` 로 된 함수가 있으면 먼저 실행
  3. `export default function Home()` 실행
- 사용 방법 (framework 문법)

  - `getServerSideProps` 함수의 리턴값은 `props` 라는 객체 프로퍼티를 포함하는 **단 하나의 객체**여야만 한다.
    → 이렇게 해야만 Next에서 읽어서 return이 되고, 페이지 컴포넌트에 값을 전달할 수 있다.

  ```tsx
  export const getServerSideProps = () => {
  	const data = 'hello' // 이런 값을 넣었다 가정하면

  	// 아래의 형태로 return 될 수 있도록 설정 가능
  	return {
  		props: {
  			data,
  		}
  	}
  }

  export default funciton Home({data}: any) {

  	console.log('data : ', data) // data: hello
  }
  ```

  → `getServerSideProps`는 페이지 컴포넌트보다 먼저 실행되어서 페이지 컴포넌트에 필요한 데이터를 서버나 다른 곳에서 갖고와 페이지 컴포넌트에 props로 전달할 수 있다.

### `getServerSideProps` 주의할 점

- `getServerSideProps` 함수는 사전 렌더링을 하는 과정에서 한번만 실행되므로 오직 서버측에서만 실행되는 함수이다.
- 따라서, 추가로 코드를 넣더라도 브라우저에서는 출력되지 않는다.

  ```tsx
  export const getServerSideProps = () => {
    console.log('서버사이드프롭스에요' // 브라우저에 출력❌

  	const data = 'hello' // 이런 값을 넣었다 가정하면

  	// 아래의 형태로 return 될 수 있도록 설정 가능
  	return {
  		props: {
  			data,
  		}
  	}
  }
  ```

  → 대신에 Next서버에 실행시 나오는 로그에는 요청이 들어올 때마다 출력이 된다.

- 따라서 window 객체의 경우 브라우저에서 실행되는 객체는 읽을 수 없으므로 해당 함수에서 실행 시 오류가 발생한다.

  ```tsx
  export const getServerSideProps = () => {
  	window.location; // 에러 발생 > ReferenceError: window is not defined
    console.log('서버사이드프롭스에요' // 브라우저에 출력❌

  	const data = 'hello' // 이런 값을 넣었다 가정하면

  	// 아래의 형태로 return 될 수 있도록 설정 가능
  	return {
  		props: {
  			data,
  		}
  	}
  }
  ```

  → window객체가 undefined로 window객체를 찾으면 없으므로 에러가 발생한다.

- `Home` 페이지 컴포넌트도 서버에서 한번 먼저 실행 된 다음 브라우저에서 실행이 되어 총 2번 실행된다.

  1.  브라우저로부터 접속 요청을 받았을 때 사전 렌더링을 위해서 먼저 서버 측에서 한번 `Home` 페이지 컴포넌트가 실행된다. → 서버에서 1번

  2.  브라우저에서 자바스크립트 번들 형태로 전달이 되어서 브라우저 측에서 실행 될 때,
      즉 하이드레이션 과정이 진행 될 때 한번 더 실행됨 → 브라우저에서 1번

          따라서 `Home` 컴포넌트에 `window` 함수를 사용하면 같은 에러가 발생한다.

          ```tsx
          export default function Home({data}: any) {
            console.log('data : ', data)
            window.location // 에러 발생 > ReferenceError: window is not defined
            return (
              <div className={style.container}>
                <section>
                  <h3>지금 추천하는 도서</h3>
                  {books.map((book) => (
                    <BookItem key={book.id} {...book} />
                  ))}
                </section>
                <section>
                  <h3>등록된 모든 도서</h3>
                  {books.map((book) => (
                    <BookItem key={book.id} {...book} />
                  ))}
                </section>
              </div>
            )
          }

          ```
          - Home 내부에 있는 window도 undefined로 undefined.location이므로 에러가 발생한다.

### window 객체를 브라우저에서만 실행되도록 하려면?

→ `useEffect` 를 이용한다.

→ useEffect 훅 자체가 컴포넌트가 마운트 된 이후이므로 브라우저에서만 실행이 되므로 브라우저에서만 실행된다.

```tsx
import SearchableLayout from '@/components/searchable-layout'
import style from './index.module.css'
import {ReactNode, useEffect} from 'react'
import books from '@/mock/books.json'
import BookItem from '@/components/book-item'

export const getServerSideProps = () => {
  const data = 'hello'

  return {
    props: {
      data,
    },
  }
}
// getServerSideProps로 return된 값은 props로 받아올 수 있다.
export default function Home({data}: any) {
  console.log('data : ', data)

  **useEffect(() => {
    console.log(window.location)
  }, [])**

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  )
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
```

### getServerSideProps의 return값을 props로 전달 받을 때 type은?

- Next에서 정의한 타입으로만 사용해도 모든 타입이 커버된다.

### `InferGetServerSidePropsType`

- getServerSideProps의 반환값 타입을 자동으로 추론해주는 그런 기능을 하는 타입
- 해당 타입 import후 제네릭으로 `<typeof getServerSideProps>` 함수를 넣어주면 자동으로
  `getServerSideProps` 함수의 반혼값 타입이 추론되어 매개변수 타입으로 정의된다.

```tsx
import SearchableLayout from '@/components/searchable-layout'
import style from './index.module.css'
import {ReactNode, useEffect} from 'react'
import books from '@/mock/books.json'
import BookItem from '@/components/book-item'
**import {InferGetServerSidePropsType} from 'next'**

export const getServerSideProps = () => {
  const data = 'hello'

  return {
    props: {
      data,
    },
  }
}
// getServerSideProps로 return된 값은 props로 받아올 수 있다.
export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  console.log('props : ', props) // props : {data: 'hello'}

  useEffect(() => {
    console.log(window.location)
  }, [])
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  )
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}

```

### SSR로 실제 데이터 갖고와서 처리하기

```tsx
import SearchableLayout from '@/components/searchable-layout'
import style from './index.module.css'
import {ReactNode} from 'react'
import BookItem from '@/components/book-item'
import {InferGetServerSidePropsType} from 'next'
import fetchBooks from '@/lib/fetch-books'
import fetchRandomBooks from '@/lib/fetch-random-books'

export const getServerSideProps = async () => {
  const allBooks = await fetchBooks()
  const recoBooks = await fetchRandomBooks()

  return {
    props: {
      allBooks,
      recoBooks,
    },
  }
}
// getServerSideProps로 return된 값은 props로 받아올 수 있다.
export default function Home({
  allBooks,
  recoBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  )
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
```

**위 코드의 문제점**

→ 데이터 처리가 직렬적 : allbooks의 api 호출이 끝난 후 recoBooks(recommended Books) api 호출이 되고 있다.

### 위의 코드 개선

- 데이터 처리를 병렬적으로 할 수 있도록 수정
- `Promise.all()` 메서드 이용
  → 인수로 전달한 배열안에 들어있는 모든 비동기 함수를 동시에 실행해주는 메서드

```tsx
import SearchableLayout from '@/components/searchable-layout'
import style from './index.module.css'
import {ReactNode} from 'react'
import BookItem from '@/components/book-item'
import {InferGetServerSidePropsType} from 'next'
import fetchBooks from '@/lib/fetch-books'
import fetchRandomBooks from '@/lib/fetch-random-books'

export const getServerSideProps = async () => {
  // const allBooks = await fetchBooks()
  // const recoBooks = await fetchRandomBooks()
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ])

  return {
    props: {
      allBooks,
      recoBooks,
    },
  }
}
// getServerSideProps로 return된 값은 props로 받아올 수 있다.
export default function Home({
  allBooks,
  recoBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  )
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
```

- 개선되었을 때 장점 : API request가 동시에 발송되기에 좀 더 빠르게 페이지가 렌더링 된다.

### 정리하기

- index페이지에 필요한 모든 데이터를 서버사이드 렌더링 방식으로 불러와서 컴포넌트에 전달하는 방법

  1. async 함수가 export가 되면 SSR로 동작하게 된다.
  2. 특정 함수를 통해 API 를 사전에 호출하고, `return {props: {}}` 로 컴포넌트에서 props로 받아서 처리할 수 있게 호출한 값을 return 한다.

  ```tsx
  export const getServerSideProps = async () => {
    // const allBooks = await fetchBooks()
    // const recoBooks = await fetchRandomBooks()
    const [allBooks, recoBooks] = await Promise.all([
      fetchBooks(),
      fetchRandomBooks(),
    ])

    return {
      props: {
        allBooks,
        recoBooks,
      },
    }
  }
  ```

  1. 위의 함수를 자동을 추론할 수 있는 Next의 타입 `InferGetServerSidePropsType` 으로 `getServerSideProps` 함수의 타입을 추론할 수 있게하여 사전에 호출한 데이터를 사용하는 컴포넌트에서 사용할 수 있도록 처리한다.

  ```tsx

  ```

## 검색어 SSR로 처리하기

1. `getServerSideProps`라는 함수를 export하면 SSR로 동작하므로 컴포넌트 위에 해당 함수를 선언한다.

   ```tsx
   export const getServerSideProps = async () => {
     return {
       props: {},
     }
   }
   ```

2. 검색어는 URI에 query string으로 `?q={검색어}` 로 검색어로 데이터를 불러와야한다.

   - 처리 방법
     - Query String으로 전달된 q의 검색어 값을 읽어온다.
     - 해당 데이터를 백엔드 서버로부터 불러와야한다.
   - query string의 값을 getServerSideProps함수 내에서 읽어보자.
     1. getServerSideProps의 매개변수에 `context` 라는 값을 이용하는데, 해당 값의 타입은 Next에서 자체 제공하는 `GetServerSidePropsContext` 로 정의한다.

   ### `GetServerSidePropsContext`

   - `context` 매개변수는 현재 브라우저로부터 받은 요청에 대한 모든 정보가 다 포함되어 있다.
   - context를 console.log로 찍어보면 터미널에 많은 정보가 나오는데 그 중
     ```tsx
     export const getServerSideProps = async (
       context: GetServerSidePropsContext,
     ) => {
       console.log('context : ', context)
       return {
         props: {},
       }
     }
     // context: .... query: {q: '한입'} ....
     ```
     → 해당 값을 꺼내서 사용하면 된다.
   - 코드

     ```tsx
     // src/pages/search/index.tsx
     import SearchableLayout from '@/components/searchable-layout'
     import {ReactNode} from 'react'
     import BookItem from '@/components/book-item'
     import {GetServerSidePropsContext, InferGetServerSidePropsType} from 'next'
     import fetchBooks from '@/lib/fetch-books'

     export const getServerSideProps = async (
       context: GetServerSidePropsContext,
     ) => {
       const q = context.query.q

       const books = await fetchBooks(q as string)

       return {
         props: {
           books,
         },
       }
     }

     export default function Page({
       books,
     }: InferGetServerSidePropsType<typeof getServerSideProps>) {
       return (
         <div>
           {books.map((book) => (
             <BookItem key={book.id} {...book} />
           ))}
         </div>
       )
     }

     Page.getLayout = (page: ReactNode) => {
       return <SearchableLayout>{page}</SearchableLayout>
     }

     // src/lib/fetch-books.ts
     // 기존 코드에서 query string들어왔을 때 분기처리 추가
     import {BookData} from '@/types'

     export default async function fetchBooks(q?: string): Promise<BookData[]> {
       let url = `http://localhost:12345/book`

       if (q) {
         url += `/search?q=${q}`
       }

       try {
         const response = await fetch(url)

         if (!response.ok) {
           throw new Error()
         }

         return await response.json()
       } catch (err) {
         console.error(err)
         return []
       }
     }
     ```

## 상세페이지 SSR로 처리하기

1. `getServerSideProps`라는 함수를 export하면 SSR로 동작하므로 컴포넌트 위에 해당 함수를 선언한다.

   ```tsx
   export const getServerSideProps = async () => {
     return {
       props: {},
     }
   }
   ```

2. 검색어는 URL parameter `/{id}` 로 전달되는 값으로 도서아이디를 기준으로 특정 도서의 데이터를 불러와야 한다.

   - 처리 방법
     - getServerSideProps함수 내에서 url파라미터를 불러온다.
     - `/book/1` 이렇게 넘어오면 1번의 도서 데이터를 서버에서 불러온다.
   - query string을 처리했던 타입 그대로 사용

   ### `GetServerSidePropsContext`

   - 해당 타입을 getServerSideProps의 매개변수인 `context` 의 타입으로 해준다.

   ```tsx
   export const getServerSideProps = async (
     context: GetServerSidePropsContext,
   ) => {
     const id = context.params!.id // !로 context.params값이 있을 것으로 타입을 단언해준다.

     return {
       props: {},
     }
   }
   ```

   ### `context.params!.id`

   - params값은 undefined 일 수 있기때문에 에러가 난다.
   - 이 때 타입 단언을 위해 `! (undefined가 아닐 것이다.)` 사용
   - `!` 로 타입 단언을 해도 안전한 이유는?
     → `[id].tsx` 페이지는 무조건 URL파라미터가 하나 있어야만 접근할 수 있는 페이지이므로, URL 파라미터는 반드시 있을 수 밖에 었는 값이다.
