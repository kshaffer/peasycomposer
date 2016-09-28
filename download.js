function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text.replace('<p>', '\n<p>').replace('</p>', '</p>\n').replace('<blockquote>', '\n<blockquote>').replace('</blockquote>', '</blockquote>\n').replace('<h2>', '\n<h2>').replace('</h2>', '</h2>\n').replace('<h3>', '\n<h3>').replace('</h3>', '</h3>\n')));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function make_yaml(text) {
  var html_text = text.replace('<p>', '\n').replace('</p>', '\n').replace('<blockquote>', '\n> ').replace('</blockquote>', '\n').replace('<h2>', '\n## ').replace('</h2>', '\n').replace('<h3>', '\n### ').replace('</h3>', '\n');
  var yaml_header = '---\nlayout: post\ntitle: \"\"\nmodified: 2016-09-27 14:41:00 -0400\nimage:\n  feature: filename.jpg\n  teaser: filename-teaser.jpg\n  credit: photographername\n  creditlink: linktosource\nshare: true\ncategories: [category1, category2]\n---\n\n'
  return yaml_header + html_text;
}
