// This file is copyright ©2016 Kris P. Shaffer.
// This file is part of CleanWrite.

// CleanWrite is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// CleanWrite is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with CleanWrite.  If not, see <http://www.gnu.org/licenses/>.

function download(filename, text, format) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text.replace(/<p>/g, '\n<p>').replace(/<\/p>/g, '</p>\n').replace(/<blockquote>/g, '\n<blockquote>').replace(/<\/blockquote>/g, '</blockquote>\n').replace(/<h2>/g, '\n<h2>').replace(/<\/h2>/g, '</h2>\n').replace(/<h3>/g, '\n<h3>').replace(/<\/h3>/g, '</h3>\n').replace(/onclick=\"javascript.*?\"/g, '').replace(/\n{2,}/gi, '\n').replace(/\n{2,}/gi, '\n').replace(/\n{2,}/gi, '\n').replace(/\n{2,}/gi, '\n').replace(/<\/{0,1}hypothesis-highlight>/g, '').replace(/<\/{0,1}article.*?>/g, '\n').replace(/<\/{0,1}span.*?>/g, '').replace(/<\/{0,1}div.*?>/g, '\n').trim()));
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
  var today = new Date();
  var date = today.getFullYear()+'-'+("0" + (today.getMonth()+1)).slice(-2)+'-'+("0" + (today.getDate()+1)).slice(-2);
  var time = ("0" + (today.getHours()+1)).slice(-2) + ":" + ("0" + (today.getMinutes()+1)).slice(-2) + ":" + ("0" + (today.getSeconds()+1)).slice(-2);
  var dateTime = date+' '+time;
  var html_text = text.replace(/<p>/g, '\n').replace(/<\/p>/g, '\n').replace(/<blockquote>/g, '\n> ').replace(/<\/blockquote>/g, '\n').replace(/<h2>/g, '\n## ').replace(/<\/h2>/g, '\n').replace(/<h3>/g, '\n### ').replace(/<\/h3>/g, '\n').replace(/<(b|strong)>/g, '**').replace(/<\/(b|strong)>/g, '**').replace(/<(i|em)>/g, '*').replace(/<\/(i|em)>/g, '*').replace(/<\/{0,1}hypothesis-highlight>/g, '').replace(/<\/{0,1}span.*?>/g, '').replace(/<\/{0,1}article.*?>/g, '\n').replace(/<\/{0,1}div.*?>/g, '\n');
  var yaml_header = '---\nlayout: post\ntitle: \"\"\nmodified: ' + dateTime + ' -0400\nimage:\n  feature: filename.jpg\n  teaser: filename-teaser.jpg\n  credit: photographername\n  creditlink: linktosource\nshare: true\ncategories: [category1, category2]\n---\n\n'
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

function wordCount() {
  var textToCount = document.getElementById('content').innerHTML;
  var words = textToCount.replace(/<.*?>/g, ' ').trim();
  var count = words.split(' ').length;
  //console.log(words);
  document.getElementById('word-count').innerHTML = count;
}
