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
    1. 접속 요청
    → 유저가 브라우저를 통해 서버로 접속 요청
    2. JS 실행 (렌더링)
    → JS 실행 렌더링 : 자바스크립트 코드(React컴포넌트)를 HTML로 변환하는 과정
    → 서버에서 리액트 앱을 직접 실행 시켜서 리엑트 컴포넌트들을 HTML로 변환, 사전에 렌더링을 수행
    3. 렌더링 된 HTML 응답
    → 서버에서 미리 렌더링이 완료된 HTML파일을 브라우저에 응답
    4. 화면 렌더링 (FCP)
    → 화면 렌더링 : HTM코드를 브라우저가 화면에 그려내는 작업
    → 브라우저는 렌더링이 완료된 HTMl파일을 그대로 화면에 렌더링하여 사용자는 완성된 화면을 볼 수 있다.
        
        ⇒ **JS코드가 없는 상태이므로 상호작용은 아직 불가능하다.**
        
    5. JS Bundle
    → 서버는 후속으로 리액트 앱(자바스크립트 코드)를 번들링해서 브라우저에 보내준다.
    6. 수화 Hydration
    → 브라우저는 리엑트 앱을 직접 실행하여 화면에 렌더링 되어있는 HTML요소들과 연결 (Hydration)
    7. 상호작용 가능
    → Hydration(수화)이 되어야지만 상호작용까지 가능한 상태가 된다.
    → TTI(Time To Interactive - hydration 종료 되는 시간) 지표로 표현 가능
    8. 페이지 이동의 경우 CSR과 동일한 방식으로 컴포넌트만 교체되는 방식으로 동작하게 된다. (5번에서 JS Bundle - React App을 보내준 것)

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
import { useRouter } from "next/router"

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