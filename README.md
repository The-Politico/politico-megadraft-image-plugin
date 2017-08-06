# politico megadraft image plugin - Megadraft Plugin

Megadraft image plugin that also uploads images to our image service.

## Usage

Include hidden inputs with your authorization token and the image service endpoint:

```html
<input type="hidden" name="token" value="<TOKEN>"/>
<input type="hidden" name="image-api" value="http://localhost:8000/image-service/api/upload/"/>
```

Include fontawesome and the plugin styles:

```scss
$fa-font-path: "../node_modules/font-awesome/fonts";
@import "../node_modules/font-awesome/scss/font-awesome";
@import "../src/styles/plugin.scss";
```

Include the plugin in the `plugins` prop of your `Megadraft` instance:

```js
import React from "react";
import ReactDOM from "react-dom";
import {MegadraftEditor} from "megadraft";

import plugin from "politico-megadraft-image-plugin";

class Example extends React.Component {
  render(){
    return (
      <MegadraftEditor plugins={[plugin]} />
    );
  }
}

ReactDOM.render(<Example />, document.getElementById("container"));
```

## Managing images on the server

When uploading an image, plugin components expect the server to return a response with a signature like:

```javascript
{
  "pk": "2",
  "image": "http://www.yourserver.com/path/to/image.jpg"
}
```

It's assumed the server hashes images to be unique.

The plugin tries to keep assets on the server in sync by deleting unused images. When you explicitly delete an image by clicking the trash can button or implicitly delete one by keying a delete, the component will fire a `DELETE` request to the server for the image by `pk`.




## Contributing

Install, run, test.

```
# Install npm dependencies
make setup

# Gulp dev-server task with webpack + sass running on http://localhost:8080/
make run

# Run mocha tests + eslint
make test
```

If you're constantly running tests, there's a faster alternative using mocha's
watch feature:

```
make watch_unit
```

## Releasing

There's a `prepublish` script entry on `package.json` that runs build tasks
before publishing the package.

```
npm publish
```


## Third Party

The sample plugin uses the extension icon from https://design.google.com/icons/
under [Apache License Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).
