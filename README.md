# DaumEditor-vite (Modernized)

이 프로젝트는 기존의 레거시 **Daum Editor** 소스를 바탕으로 현대적인 개발 환경인 **Vite** 기반으로 재구축한 버전입니다.

## 📌 프로젝트 개요
*   **원본 소스 위치**: `https://github.com/kakao/DaumEditor`
*   **기술 스택**: Vite, TypeScript (Main Entry), Legacy DaumEditor JS/CSS
*   **주요 목적**: 
    1.  Vite의 빠른 개발 서버(HMR) 활용
    2.  수백 개의 레거시 JS 파일을 하나로 번들링하여 로딩 성능 최적화
    3.  현대적인 빌드 시스템으로의 이관

## 🚀 주요 개선 사항
1.  **Vite 통합**: `public` 폴더 전략을 사용하여 레거시 소스의 수정 없이 Vite 환경에서 구동되도록 설계.
2.  **JS 번들링 및 압축**:
    *   `daumeditor.all.js`: 수백 개의 개별 JS 파일을 로딩 순서에 맞춰 통합. (~1.2MB)
    *   `daumeditor.all.min.js`: Terser를 사용해 최적화 및 압축. (~469KB)
3.  **Mock Loader 도입**: 원본 `editor_loader.js`의 복잡한 동적 로딩 로직을 Vite 환경에 맞게 간소화된 `EditorJSLoader` 모크로 대체하여 호환성 문제 해결.
4.  **UI 구조 복원**: 최신 브라우저 및 Vite 렌더링 방식에서 발생하던 UI 레이아웃 이슈 및 툴바 확장 기능을 HTML5 구조에 맞게 수정.

## 🛠 실행 방법
```bash
# 1. 의존성 설치 (필요시)
npm install

# 2. 레거시 번들 생성 (all.min.js 생성/업데이트)
# 수정된 개별 JS 파일들을 하나로 합치고 압축합니다.
npm run build:legacy

# 3. 개발 서버 실행 (포트: 3200)
npm run dev -- --port 3200

# 4. 프로덕션 빌드 (dist 폴더 생성)
# 실제 서비스 배포용 결과물을 생성합니다.
npm run build
```

## 📂 프로젝트 구조
*   `index.html`: 메인 에디터 진입점 및 에셋 로드 설정
*   `public/daumeditor/`: 원본 에디터 엔진, 스타일, 이미지 및 번들링된 파일들
*   `src/main.ts`: 에디터 초기화 및 설정 로직 (Vite 엔트리)
*   `scripts/bundle-legacy.js`: 레거시 JS 파일들을 번들링하는 자동화 스크립트

## ⚠️ 주의 사항
*   에디터 내부의 동적 로딩 로직(modules, attacher 등)을 위해 `public/daumeditor/js/` 경로의 원본 파일 구조가 유지되어야 합니다.
*   번들링 순서가 매우 중요하므로, 새로운 코어 파일을 추가할 때는 `scripts/bundle-legacy.js`의 리스트 순서에 주의해야 합니다.

## ⚖️ 라이선스 및 기여 (License & Credits)
이 프로젝트는 원본 **Daum Editor**의 [Apache License 2.0](https://github.com/kakao/DaumEditor/blob/master/LICENSE)을 따릅니다.

*   **Original Creator**: [Kakao Corp](http://www.kakaocorp.com)
*   **Modernized by**: Eui-Taik Na (damulhan@gmail.com) (Vite 환경 구축 및 빌드 최적화)

원본의 저작권 고지 및 라이선스 파일은 `LICENSE` 파일에서 확인하실 수 있습니다. 수정 배포 시 원본 저작권자를 명시해야 하며, Apache 2.0 라이선스 규정을 준수해야 합니다.
