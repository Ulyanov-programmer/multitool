import fs from 'fs-extra'
import ttf2woff2 from  'gulp-ttf2woff2';
import { fontsFIlePath } from "./paths.js";

export function fonts() {
  return gulp.src(paths.scr.fonts)
    .pipe(ttf2woff2({
      ignoreExt: true,
    }))
    .pipe(gulp.dest(paths.build.fonts));
}

export function fontsStyle() {
  let file_content = fs.readFileSync(fontsFIlePath)
    .toString().replace(/\s/g, "");

  if (file_content == "") {
    return fs.readdir(paths.build.fonts, (err, items) => {

      if (items) {
        for (var i = 0; i < items.length; i++) {
          let c_fontname;
          let fileName = items[i].split('.')[0];

          if (c_fontname !== fileName) {
            let fileNameLC = fileName.toLowerCase();
            let fontWeightName = fileNameLC.replace('italic', '').split('-')[1];

            let fontName = fileName.split('-')[0] ? fileName.split('-')[0] : fileName;
            let weight = fontWeightName ? fontWeightName : fileName;
            let style = fileNameLC.includes('italic') ? 'italic' : 'normal';
            let type = fileNameLC.includes('variablefont') ? 'woff2-variations' : 'woff2';

            weight = getFontWeightFromString(weight);


            if (type !== 'woff2-variations') {
              fs.appendFileSync(fontsFIlePath,
                `fontStyle('${fontName}', ${type}, ${fileName}, ${weight}, ${style})\r\n`);
            } else {
              for (let weight = 100; weight <= 900; weight += 100) {
                fs.appendFileSync(fontsFIlePath,
                  `fontStyle('${fontName}', ${type}, ${fileName}, ${weight}, ${style})\r\n`);
              }
            }
          }
          c_fontname = fileName;
        }
      }
    })
  }
}
function getFontWeightFromString(filename) {
  switch (filename) {
    case 'thin':
      return '100';
    case 'extralight':
      return '200';
    case 'light':
      return '300';
    case 'medium':
      return '500';
    case 'semibold':
      return '600';
    case 'bold':
      return '700';
    case 'extrabold':
    case 'ultrabold':
      return '800';
    case 'black':
    case 'heavy':
      return '900';

    default:
      return '400';
  }
}