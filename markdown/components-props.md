Components 와 Props
===

Components?
---

개념적으로 <strong>컴포넌트</strong>는 JavaScript 함수와 유사합니다. <strong>props</strong> 라고 하는 임의의 입력을 받은 후, 화면에 어떻게 표시되는지를 기술하는 리액트 엘리먼트를 반환합니다.

함수 컴포넌트와 클래스 컴포넌트
---

컴포넌트를 정의하는 가장 간단한 방법은 JavaScript 함수로 나타내는 것입니다.

~~~jsx
const Welcome = props => {
  return <h1>Hello, {props.name}</h1>;
}
~~~

이 함수는 데이터를 가진 하나의 "props" 객체 인자를 받은 후 리액트 엘리먼트를 반환하므로 유효한 리액트 컴포넌트입니다. 이러한 함수 구조를 가진 컴포넌트를 말 그대로 <strong>함수 컴포넌트</strong>라고 호칭합니다.

컴포넌트는 ES6 문법의 `class`를 사용하여 정의할 수도 있습니다. 이러한 클래스형 구조를 가진 컴포넌트를 <strong>클래스 컴포넌트</strong>라고 호칭합니다.

~~~jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
~~~

리액트의 관점에서 볼 때 위의 두 가지 유형의 컴포넌트는 동일합니다.

컴포넌트 렌더링
---

이전 교안에서 살펴보았던 예제를 살펴봅시다.

~~~jsx
ReactDOM.render(<App />, document.getElementById('root'));
~~~

위의 `<App />`은 사용자 정의 컴포넌트입니다. [App.js](../src/App.js) 의 반환값을 렌더링하라는 것이겠지요? 

아래의 예제는 페이지에 "Hello, Lion"을 렌더링 할 수 있습니다.

~~~jsx
// Welcome.js
const Welcome = props => {
  return <h1>Hello, {props.name}</h1>;
}

// index.js
const element = <Welcome name="Lion" />;
ReactDOM.render(element, document.getElementById('root'));
~~~

이 예시에서는 다음과 같은 일들이 일어납니다.

1. `<Welcome name="Lion" />` 엘리먼트로 `ReactDOM.render()`를 호출합니다.

2. React는 `{name: 'Lion'}` 를 props로 하여 `Welcome` 컴포넌트를 호출합니다.

3. `Welcome` 컴포넌트는 결과적으로 `<h1>Hello, Lion</h1>` 엘리먼트를 반환합니다.

4. 리액트 DOM은 `<h1>Hello, Lion</h1>` 엘리먼트와 일치하도록 DOM을 효율적으로 업데이트합니다.

#### 주의: 컴포넌트의 이름은 항상 대문자로 시작합니다.

React는 소문자로 시작하는 컴포넌트를 DOM 태그로 처리합니다. 예를 들어 `<div />`는 HTML div 태그를 나타내지만, `<Welcome />`은 컴포넌트를 나타내며 범위 안에 Welcome이 있어야 합니다.

컴포넌트 합성과 추출
---

컴포넌트는 자신의 출력에 다른 컴포넌트를 참조할 수 있습니다. 이는 모든 세부 단계에서 동일한 추상 컴포넌트를 사용할 수 있음을 의미합니다. 리액트 앱에서는 버튼, 폼, 다이얼로그, 화면 등의 모든 것들이 흔히 컴포넌트로 표현됩니다.

예를 들어 Welcome을 여러 번 렌더링하는 App 컴포넌트를 만들 수 있습니다.

~~~jsx
// Welcome.js
const Welcome = props => {
  return <h1>Hello, {props.name}</h1>;
}

// App,js
const App = () => {
  return (
    <div className="App">
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

// index.js
ReactDOM.render(<App />, document.getElementById('root'));
~~~

반대로, 컴포넌트를 여러 개의 작은 컴포넌트로 나눌 수도 있습니다.

~~~jsx
const Comment = props => {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img
          className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{props.date}</div>
    </div>
  );
};
~~~

위의 코드에서 className이 "Avatar"인 부분을 아래와 같이 추출하면 더욱 간결하게 코드를 작성할 수 있습니다.

~~~jsx
// Avatar.js
const Avatar = props => {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}

// Comment.js
const Comment = props => {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {props.date}
      </div>
    </div>
  );
}
~~~

Avatar는 자신이 Comment 내에서 렌더링 된다는 것을 알 필요가 없습니다. 따라서 props의 이름을 author에서 더욱 일반화된 user로 변경하였습니다.

props의 이름은 사용될 context가 아닌 컴포넌트 자체의 관점에서 짓는 것을 권장합니다.

props는 읽기 전용
---

함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안 됩니다. 입력된 값을 바꾸려 하지 않고 항상 동일한 입력값에 대해 동일한 결과를 반환하는 함수를 <strong>순수함수</strong>라고 하는데, 모든 리액트 컴포넌트틑 자신의 props를 다룰 때 반드시 순수함수처럼 동작해야 합니다.

~~~javascript
// 순수함수
const sum = (a, b) => {
  return a + b;
}

// 순수함수가 아님
const e = 20;
const add = (c, d) => {
  return c + d + e;
}
~~~

물론 애플리케이션 UI는 동적이며 시간에 따라 변합니다. 다음 교안에서는 <strong>state</strong>라는 새로운 개념을 소개합니다. 리액트 컴포넌트는 state를 통해 위 규칙을 위반하지 않고 사용자 액션, 네트워크 응답 및 다른 요소에 대한 응답으로 시간에 따라 자신의 출력값을 변경할 수 있습니다.


마무리
---

이번 교안에서는 리액트의 컴포넌트와 props에 대해 알아보았습니다. 다음 교안에서는 리액트 컴포넌트 안의 <strong>state</strong>와 <strong>Lifecycle</strong>에 대해 알아보도록 하겠습니다.
