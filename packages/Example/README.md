---
imports:
    import { Button, Switch, Icon } from 'antd';
---

# Example readme 示例
Readme文档语法示例

### 导入组件
在README.md 顶部使用`---`包裹需要引入的组件
```
---
imports:
    import { Button, Switch, Icon } from 'antd';
---
```

### 展示

::: demo [antd](https://github.com/gmfe/react-gm)的Button组件
```jsx
<Button type="primary" loading>
    Loading
</Button>
<Button type="primary" size="small" loading>
    Loading
</Button>
<br />
<Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
    Click me!
</Button>
<Button type="primary" icon="poweroff" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
    Click me!
</Button>
<br />
<Button shape="circle" loading />
<Button type="primary" shape="circle" loading />
```
:::

---

## 语法介绍

正常的Markdown语法不影响。有几个需要注意的地方：

### 使用示例

#### 纯渲染

::: demo 这是描述这是**描述**，点三角可展开代码。也可以不提供
```jsx
<button onClick={() => alert('dou la mi fa sou')}>click me</button>
```
:::

注意：渲染到页面的代码语言必须写`jsx`，因为loaders会把语言为`jsx`放入render的jsx内

#### 引入其他库

::: demo [antd](https://github.com/gmfe/react-gm)的Button组件
```jsx
<Button size="large">大号</Button>
<Button>中号</Button>
<Button size="small">小号</Button>
<Button size="mini">迷你</Button>
```
:::

::: demo [antd](https://github.com/gmfe/react-gm)的Switch组件
```jsx
<div>
<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
<br />
<Switch checkedChildren="1" unCheckedChildren="0" />
<br />
<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked />
</div>
```
:::

在md开头添加引入库

```js
---
imports:
    import { Switch } from 'antd';
---
```

然后
```
    ::: demo [react-gm](https://github.com/gmfe/react-gm)的日历组件
    ```jsx
    <Button/>
    ```
    :::
```

#### 更丰富的交互

比如需要 state，需要handleXXX

::: demo 更丰富的交互写在js内，这种场景更多
```js
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'hello'
        };
    }
    handleChange(e){
        this.setState({value: e.target.value});
    }
    render(){
        return (<input value={this.state.value} onChange={::this.handleChange} />)
    }
}
```
```jsx
<Test/>
```
:::




### 花括号 (表达式）

有意思的是可以用花括号写表达式，比如我要显示

当前url是：`{location.href}`

userAgent是：`{navigator.userAgent}`

因而你要用花括号时`{'{}'}`需要写成`{'{\'{}\'}'}`

### 代码里面的花括号

`{'{ }'}`会自动转，无需关注

```jsx
<div>{location.href}</div>
```

---

### react模块

默认已经`import React from 'react';`

### table

Header1 | Header2
------- | -------
cell1 | cell2



### img
![tool-editor](https://www.zybuluo.com/static/img/toolbar-editor.png)
