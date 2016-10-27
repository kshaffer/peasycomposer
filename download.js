function download(filename, text, format) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text.replace('<p>', '\n<p>').replace('</p>', '</p>\n').replace('<blockquote>', '\n<blockquote>').replace('</blockquote>', '</blockquote>\n').replace('<h2>', '\n<h2>').replace('</h2>', '</h2>\n').replace('<h3>', '\n<h3>').replace('</h3>', '</h3>\n')));
  if (format == 'md') {
    if (typeof(upload_file_name) != 'undefined') {
      var download_filename = upload_file_name.split('.')[0] + '.md';
    } else {
      var download_filename = filename;
    }
  } else {
    if (typeof(upload_file_name) != 'undefined') {
      var download_filename = upload_file_name;
    } else {
      var download_filename = filename;
    }
  }
  element.setAttribute('download', download_filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function make_yaml(text) {
  var html_text = text.replace('<p>', '\n').replace('</p>', '\n').replace('<blockquote>', '\n> ').replace('</blockquote>', '\n').replace('<h2>', '\n## ').replace('</h2>', '\n').replace('<h3>', '\n### ').replace('</h3>', '\n').replace('<b>', '**').replace('</b>', '**').replace('<i>', '*').replace('</i>', '*');
  var yaml_header = '---\nlayout: post\ntitle: \"\"\nmodified: 2016-09-27 14:41:00 -0400\nimage:\n  feature: filename.jpg\n  teaser: filename-teaser.jpg\n  credit: photographername\n  creditlink: linktosource\nshare: true\ncategories: [category1, category2]\n---\n\n'
  return yaml_header + html_text;
}


function read_file(event) {
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function(){
    var text = reader.result;
    document.getElementById('content').innerHTML = text;
  };
  reader.readAsText(input.files[0]);
  upload_file_name = input.files[0].name;
  console.log(upload_file_name);
}

var back = 'off';

function background_image() {
  if (back == 'off') {
    back = 'on';
    document.getElementById('body-main').style.backgroundImage = 'url(street.jpg)';
    document.getElementById('body-main').style.backgroundSize = 'cover';
    document.getElementById('body-main').style.backgroundAttachment = 'fixed';
    document.getElementById('body-main').style.color = '#ffffff';
    document.getElementById('body-main').style.textShadow = '1px 1px 2px black';
  } else {
    back = 'off';
    document.getElementById('body-main').style.backgroundImage = '';
    document.getElementById('body-main').style.color = '#333';
    document.getElementById('body-main').style.textShadow = '';
  }

}
