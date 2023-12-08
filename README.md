<!-- Ctrl + Shift + V => live view this file in VS Code -->

# Why did I switch to grunt?

Gulp does not have support for node 20 and higher, which already complicates the use, and in the future will severely limit the available plugins.

Grunt is updated quite often, even having Node 20 and 21 support.

## Get started? 

I will create a wonderful wiki... Someday. <br>
Right now i can only give you the basics:

#### Commands

- Start development mode: <code>yarn d</code> or <code>yarn development</code>
- Start production mode: <code>yarn p</code> or <code>yarn production</code>
- Start the setup script: <code>yarn setup</code>

#### Folders

- sources
  - assets 
    - [**/*] Files from this folder will be moved to dist without changes 
      - (including subfolders)
  - components 
    - [*.html] Reusable chunks of HTML. See posthtml-components
  - fonts 
    - [*.otf,ttf] Your fonts
  - images 
    - [**/*] Your images 
      - (including subfolders)
  - scripts 
    - [**/*.js,ts] Scripts 
      - (including subfolders)
      - [**/*.pcss] and stylesheets (only in subfolders, was intended for modules)
  - styles 
    - [*.pcss] Stylesheets, including an <code>_environment</code> file with content common to all stylesheets
  - [*.html] In root of directory you can write your <code>.html</code> files

- <code>setup.js</code> - The file for initial configuration and cleaning.
- tmp - Folder for the cache.
- grunt - Folder for grunt configurations.
- <code>Gruntfile.cjs</code> - The Grunt main file.
- .yarn - Data for yarn, including the plugin cache.

**Don't forget to install the recommended extensions.**

---

## **[RU]**

# Почему я перешёл на Grunt?

Gulp не имеет поддержки Node 20 и выше, что усложняет использование уже сейчас, в будущем уменьшая количество доступных плагинов.
Grunt достаточно часто обновляется, имеет поддержку для Node 20 и 21.

## Как пользоваться?

Когда нибудь я напишу отличную вики... Но это будет потом.<br>
А пока я могу написать лишь основы:

#### Команды

- Запустить в режиме разработки: <code>yarn d</code> или <code>yarn development</code>
- Запустить в режиме выпуска: <code>yarn p</code> или <code>yarn production</code>
- Запустить скрипт настройки и очистки: <code>yarn setup</code>

#### Папки

- sources
  - assets 
    - [**/*] Файлы, что будут перемещены в dist без изменений
      - (включая подпапки)
  - components 
    - [*.html] Переиспользуемые куски HTML. Смотри posthtml-components
  - fonts 
    - [*.otf,ttf] Ваши шрифты
  - images 
    - [**/*] Ваши изображения
      - (включая подпапки)
  - scripts 
    - [**/*.js,ts] Скрипты 
      - (включая подпапки)
      - [**/*.pcss] и стили (только подпапки, изначально предназначено для модулей)
  - styles 
    - [*.pcss] Стили, включая файл <code>_environment</code> с содержимым общим для всех файлов
  - [*.html] В корневой директории вы можете писать ваши <code>.html</code> файлы.

- <code>setup.js</code> - Файл для запуска настройки и очистки.
- tmp - Папка для кэша.
- grunt - Папка для конфигураций Grunt.
- <code>Gruntfile.cjs</code> - Главный исполняемый файл Grunt.
- .yarn - Данные для yarn, включая кэш плагинов.

**Не забудь установить рекомендуемые расширения.**