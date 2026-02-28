# DaumEditor-vite (Modernized)

이 프로젝트는 오픈소스 **Daum Editor**를 현대적인 웹 개발 환경인 **Vite**와 **TypeScript** 기반으로 마이그레이션하고 최적화한 프로젝트다. 단순히 실행만 가능하게 한 것이 아니라, 실제 서비스 개발 및 유지보수가 용이하도록 밑바닥 구조를 완전히 재설계했다.

## 주요 변경 사항

### 1. 통합 번들링
*   **기존**: 에디터 구동 시 `txlib.js`, `trex.js`, `canvas.js` 등 **수십 개의 JS 파일을 개별적으로 로드**하여 네트워크 오버헤드와 순서 제어 문제가 있었다.
*   **변경**: `scripts/bundle-legacy.js`를 통해 에디터 엔진의 엄격한 의존성 순서를 분석하여 단 하나의 파일(`daumeditor.all.js`)로 통합했다.
    *   **Minification**: Terser를 사용하여 전체 엔진 용량을 약 **60% 절감**했다 (1.2MB -> 460KB).
    *   **Auto-Sync**: 빌드 시 번들링된 결과물이 레거시 로더가 사용하는 엔트리 포인트(`js/editor.js`)로 자동 동기화되도록 설계하여 기존 HTML 페이지와의 호환성을 완벽히 유지한다.

### 2. 하이브리드 로딩 아키텍처 (Compatibility Layer)
Vite의 모듈 시스템(ESM)과 에디터의 레거시 전역 변수 방식 간의 충돌을 해결하기 위해 **글로벌 브릿지**를 구축했다.
*   **Global Exposure**: 번들링 과정에서 `window.Editor`, `window.Trex`, `window.$tx` 및 필수 상수(`_TRUE`, `_FALSE` 등)를 명시적으로 `window` 객체에 바인딩하여, Vite 환경 내부와 외부(레거시 .html) 모두에서 동일한 에디터 인스턴스에 접근할 수 있게 했다.
*   **EditorJSLoader Mocking**: 복잡한 동적 경로 계산 로직을 Vite의 `public` 폴더 구조에 맞게 최적화된 모크 객체로 대체하여 경로 깨짐 문제를 근본적으로 해결했다.

### 3. 현대적 개발 환경 및 안정성
*   **TypeScript 지원**: `src/main.ts`를 엔트리 포인트로 사용하여 타입 안정성이 확보된 상태에서 에디터를 초기화하고 제어할 수 있다.
*   **Vite HMR**: 에디터 설정이나 스타일 수정 시 브라우저 새로고침 없이 즉시 반영되는 현대적인 개발 경험을 제공한다.
*   **성능 최적화**: 다수의 HTTP 요청을 단일 요청으로 줄여 초기 로딩 속도를 개선했다.

## 실행 및 빌드 가이드

### 개발 환경 (Development)
```bash
# 1. 의존성 설치
npm install

# 2. 레거시 엔진 번들링 (최초 1회 또는 엔진 소스 수정 시 실행)
# 이 명령은 public/daumeditor/js/editor.js를 최신 번들로 업데이트한다.
npm run build:legacy

# 3. Vite 개발 서버 실행 (HMR 지원)
npm run dev -- --port 3200
```

### 배포 환경 (Production)
```bash
# 프로덕션용 최적화 빌드 실행 (dist 폴더 생성)
npm run build
```

## 프로젝트 구조 및 핵심 파일
*   `scripts/bundle-legacy.js`: 에디터 엔진 통합 및 호환성 코드 주입 핵심 스크립트.
*   `public/daumeditor/`: 
    *   `daumeditor.all.js`: 통합된 전체 엔진 번들.
    *   `js/editor.js`: 레거시 로더가 참조하는 실제 엔트리 (번들 복사본).
*   `src/main.ts`: TypeScript 기반의 에디터 초기화 런타임 코드.
*   `index.html`: 최신 Vite 기반의 에디터 데모 페이지.

---

## 라이선스 및 기여 (License & Credits)
이 프로젝트는 원본 **Daum Editor**의 [Apache License 2.0](https://github.com/kakao/DaumEditor/blob/master/LICENSE)을 따른다.

*   **Original Creator**: [Kakao Corp](http://www.kakaocorp.com)
*   **Modernized by**: Eui-Taik Na (damulhan@gmail.com) (Vite 환경 구축 및 빌드 최적화)

원본의 저작권 고지 및 라이선스 파일은 `LICENSE` 파일에서 확인 가능하다. 수정 배포 시 원본 저작권자를 명시해야 하며, Apache 2.0 라이선스 규정을 준수해야 한다.

