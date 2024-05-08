MFM 是一种在 Misskey、Firefish、Akkoma 中使用的标记语言，可以在很多地方使用。您可以在此处查看所有可用的 MFM 语法的列表。

## 提及
可以使用 @+用户名 来指示特定用户。
@example

```
@example
```

## 话题标签
可以使用井号+文字来表示话题标签。

#test
```
#test
```

## 链接
可以将部分文字和 URL 关联起来。

[通过 Firefish 扩展联邦宇宙的世界](https://firefish.dev)
```
[通过 Firefish 扩展联邦宇宙的世界](https://firefish.dev)
```

## 自定义表情符号
可以将自定义表情符号使用冒号括起来，就可以显示自定义表情符号了。

:A_BlobCat_Approach:
```
:A_BlobCat_Approach:
```

## 粗体
可以将文字显示为粗体来表示强调。

**通过 Firefish 扩展联邦宇宙的世界**
```
**通过 Firefish 扩展联邦宇宙的世界**
```


## 缩小
可以使内容文字变小、变淡。

<small>通过 Firefish 扩展联邦宇宙的世界</small> $[small 通过 Firefish 扩展联邦宇宙的世界]
```
<small>通过 Firefish 扩展联邦宇宙的世界</small> $[small 通过 Firefish 扩展联邦宇宙的世界]
```

## 引用
将内容显示为引用。


> 通过 Firefish 扩展联邦宇宙的世界
```
> 通过 Firefish 扩展联邦宇宙的世界
```

## 居中
可以将内容居中显示。

<center>通过 Firefish 扩展联邦宇宙的世界</center>
$[center 通过 Firefish 扩展联邦宇宙的世界]
```
<center>通过 Firefish 扩展联邦宇宙的世界</center>
$[center 通过 Firefish 扩展联邦宇宙的世界]
```

## 代码（内嵌）
将文字中的程序代码语法高亮显示。

`<: "Hello, world!"`
```
`<: "Hello, world!"`
```

## 代码（块）
语法高亮显示整块程序代码。

```
~ (#i, 100) {
	<: ? ((i % 15) = 0) "FizzBuzz"
		.? ((i % 3) = 0) "Fizz"
		.? ((i % 5) = 0) "Buzz"
		. i
}
```
``````
```
~ (#i, 100) {
	<: ? ((i % 15) = 0) "FizzBuzz"
		.? ((i % 3) = 0) "Fizz"
		.? ((i % 5) = 0) "Buzz"
		. i
}
```
``````

## 数学公式（内嵌）
显示内嵌的 KaTeX 公式

\(x= \frac{-b' \pm \sqrt{(b')^2-ac}}{a}\)
```​
\(x= \frac{-b' \pm \sqrt{(b')^2-ac}}{a}\)
```

## 数学公式（块）
显示整块的 KaTeX 数学公式


\[x= \frac{-b' \pm \sqrt{(b')^2-ac}}{a}\]
```
\[x= \frac{-b' \pm \sqrt{(b')^2-ac}}{a}\]
```

## 搜索

显示含有搜索内容示例的搜索框。

通过 Firefish 扩展联邦宇宙的世界 [search]
通过 Firefish 扩展联邦宇宙的世界 [検索]
通过 Firefish 扩展联邦宇宙的世界 検索
```
通过 Firefish 扩展联邦宇宙的世界 [search]
通过 Firefish 扩展联邦宇宙的世界 [検索]
通过 Firefish 扩展联邦宇宙的世界 検索
```

## 翻转
将内容上下或左右翻转。

$[flip 通过 Firefish 扩展联邦宇宙的世界]
$[flip.v 通过 Firefish 扩展联邦宇宙的世界]
$[flip.h,v 通过 Firefish 扩展联邦宇宙的世界]
```
$[flip 通过 Firefish 扩展联邦宇宙的世界]
$[flip.v 通过 Firefish 扩展联邦宇宙的世界]
$[flip.h,v 通过 Firefish 扩展联邦宇宙的世界]
```

## 字体

可以设置内容所使用的字体。

$[font.serif 通过 Firefish 扩展联邦宇宙的世界]
$[font.monospace 通过 Firefish 扩展联邦宇宙的世界]
$[font.cursive 通过 Firefish 扩展联邦宇宙的世界]
$[font.fantasy 通过 Firefish 扩展联邦宇宙的世界]

```
$[font.serif 通过 Firefish 扩展联邦宇宙的世界]
$[font.monospace 通过 Firefish 扩展联邦宇宙的世界]
$[font.cursive 通过 Firefish 扩展联邦宇宙的世界]
$[font.fantasy 通过 Firefish 扩展联邦宇宙的世界]
```

## 大
以大尺寸显示内容。

$[x2 🍮]
```
$[x2 🍮]
```

## 非常大
以更大尺寸显示内容。


$[x3 🍮]
```
$[x3 🍮]
```

## 最大
以最大尺寸显示内容。

$[x4 🍮]
```
$[x4 🍮]
```

## 模糊
产生模糊效果。将鼠标指针放在上面即可将内容显示出来。

$[blur 通过 Firefish 扩展联邦宇宙的世界]
```
$[blur 通过 Firefish 扩展联邦宇宙的世界]
```

## 动画（果冻）
显示果冻一样的动画效果。

$[jelly 🍮] $[jelly.speed=3s 🍮] $[jelly.delay=3s 🍮] $[jelly.loop=3 🍮]
```
$[jelly 🍮] $[jelly.speed=3s 🍮] $[jelly.delay=3s 🍮] $[jelly.loop=3 🍮]
```

## 动画（锵锵）
显示"锵锵！"的动画效果。

$[tada 🍮] $[tada.speed=3s 🍮] $[tada.delay=3s 🍮] $[tada.loop=3 🍮]
```
$[tada 🍮] $[tada.speed=3s 🍮] $[tada.delay=3s 🍮] $[tada.loop=3 🍮]
```

## 动画（跳动）
显示跳动的动画效果。

$[jump 🍮] $[jump.speed=3s 🍮] $[jump.delay=3s 🍮] $[jump.loop=3 🍮]
```
$[jump 🍮] $[jump.speed=3s 🍮] $[jump.delay=3s 🍮] $[jump.loop=3 🍮]
```


## 动画（弹性）
显示弹性一样的动画效果。


$[bounce 🍮] $[bounce.speed=3s 🍮] $[bounce.delay=3s 🍮] $[bounce.loop=3 🍮]
```
$[bounce 🍮] $[bounce.speed=3s 🍮] $[bounce.delay=3s 🍮] $[bounce.loop=3 🍮]
```

## 动画（回转）
显示回转的动画效果。

$[spin 🍮] $[spin.left 🍮] $[spin.alternate 🍮]
$[spin.x 🍮] $[spin.x,left 🍮] $[spin.x,alternate 🍮]
$[spin.y 🍮] $[spin.y,left 🍮] $[spin.y,alternate 🍮]

$[spin.speed=3s 🍮] $[spin.delay=3s 🍮] $[spin.loop=3 🍮]

```
$[spin 🍮] $[spin.left 🍮] $[spin.alternate 🍮]
$[spin.x 🍮] $[spin.x,left 🍮] $[spin.x,alternate 🍮]
$[spin.y 🍮] $[spin.y,left 🍮] $[spin.y,alternate 🍮]

$[spin.speed=3s 🍮] $[spin.delay=3s 🍮] $[spin.loop=3 🍮]
```

## 动画（摇晃）
显示摇晃的动画效果。

$[shake 🍮] $[shake.speed=3s 🍮] $[shake.delay=3s 🍮] $[shake.loop=3 🍮]
```
$[shake 🍮] $[shake.speed=3s 🍮] $[shake.delay=3s 🍮] $[shake.loop=3 🍮]
```

## 动画（颤抖）
显示强烈颤抖的动画效果。

$[twitch 🍮] $[twitch.speed=3s 🍮] $[twitch.delay=3s 🍮] $[twitch.loop=3 🍮]
```
$[twitch 🍮] $[twitch.speed=3s 🍮] $[twitch.delay=3s 🍮] $[twitch.loop=3 🍮]
```
## 彩虹
用彩虹色来显示内容。

$[rainbow 🍮] $[rainbow.speed=3s 🍮] $[rainbow.delay=3s 🍮] $[rainbow.loop=3 🍮]
```
$[rainbow 🍮] $[rainbow.speed=3s 🍮] $[rainbow.delay=3s 🍮] $[rainbow.loop=3 🍮]
```
## 闪光
添加发光粒子效果。

$[sparkle 🍮]

```
$[sparkle 🍮]
```

## 旋转
旋转指定的角度。

$[rotate 🍮]
$[rotate.deg=45 🍮]
$[rotate.x,deg=45 Hello, world!]
```
$[rotate 🍮]
$[rotate.deg=45 🍮]
$[rotate.x,deg=45 Hello, world!]
```

## 渐淡
内容淡入和淡出。

```
$[fade 🍮] $[fade.out 🍮] $[fade.speed=3s 🍮] $[fade.delay=3s 🍮]
```
## 裁剪
裁剪内容。

$[crop.top=50 🍮] $[crop.right=50 🍮] $[crop.bottom=50 🍮] $[crop.left=50 🍮]
```
$[crop.top=50 🍮] $[crop.right=50 🍮] $[crop.bottom=50 🍮] $[crop.left=50 🍮]
```
## 位置
将内容移动指定的量。

$[position.y=-1 🍮]
```
$[position.x=-1 🍮]
```
## 缩放
按指定量缩放内容。

$[scale.x=1.3 🍮]
$[scale.x=1.5,y=3 🍮]
$[scale.y=0.3 🍮]
```
$[scale.x=1.3 🍮]
$[scale.x=1.5,y=3 🍮]
$[scale.y=0.3 🍮]
```

## 前景色
更改文本的前景色。

$[fg.color=eb6f92 Text color]
```
$[fg.color=eb6f92 Text color]
```

## 背景色
更改文本的背景色。

$[bg.color=31748f Background color]
```
$[bg.color=31748f Background color]
```

## 简洁
禁用所有内部语法。

<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>
```
<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>
```