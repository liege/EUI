## Button

*
author: cage   
email: feng.liu@ifchange.com
*

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：type -> shape -> size -> loading -> disabled

该组件扩展自 [ant design Button](https://ant.design/components/button/)

### API

属性|说明|类型|默认值
---|----|---|-----
tag | 设置按钮的标签，可以是 `a`、`span`、`button`、`div`等， 默认为 button|String|button
type|设置按钮类型，可选值为 `primary` `secondary` `ghost` `dashed` 或者不设|String|secondary
htmlType|设置 button 原生的 type 值，可选值请参考 [HTML标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type)|String|button
icon|设置按钮的图标类型|String|-
shape|设置按钮形状，可选值为 `circle`、`circle-outline` 或者不设|String|-
size|设置按钮大小，可选值为 `small`、`large`、`mini`或者不设|String|default
loading|设置按钮载入状态，注意：该属性只在 tag 为 button 时生效|Boolean|false
onClick|click 事件的 handler|Function|-
className|自定义按钮类名|String|-
fixedWidth|固定按钮宽度，fixedWidth的值就是按钮的宽度|Number|-
