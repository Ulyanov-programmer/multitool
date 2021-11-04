# Default Project
Default Project - my standard project to start any layout. It will be gradually updated and supplemented, this is not the final version.

<!-- Ctrl + Shift + V => view this file in VS Code -->

<details>
 <summary>RU Как запустить?</summary>
 <br>

<details>
<summary>GitHub Pages (рекомендуется)</summary>
<br> 
Вы можете запустить проект не скачивая его, сразу открыв в браузере.

Для этого откройте [этот сайт на GitHub Pages]
<br> (рекомендую выключить редакторы внешнего вида страниц вроде *dark-reader*.)
<br> <br>
</details>

<details>
<summary>VS Code</summary>
<br>

1. Скопируйте путь к репозиторию, **не забыв указать интересующую вас ветку**. 

![howToLaunch_vsc1](/readmeFiles/howToLaunchVSCode/howToLaunch_vsc1.png)

2. Запустите Visual Studio Code, где, выбрав элемент Explorer, выберите **Clone repository**.

![howToLaunch_vsc1](/readmeFiles/howToLaunchVSCode/howToLaunch_vsc2.png)

3. Во всплывающем окне введите ранее скопированный путь к репозиторию и выберите папку, в которой вы хотите сохранить файлы. 

![howToLaunch_vsc1](/readmeFiles/howToLaunchVSCode/howToLaunch_vsc3.png)

> *Убедитесь, что в терминале vs code указан путь **к папке проекта!***
> <br>
> *Убедитесь так же в том, что у вас установлен Python (скорее всего, вам понадобится версия 2.7, если установлена более новая, возможно, вам придется ее удалить).*

4. Откройте терминал (**ctrl + j** или **вид** -> **терминал**), введите ``npm i``.

5. Если в процессе выполнения команды всё пойдёт по плану, вы увидите что-то вроде этого: 

![howToLaunch_vsc1](/readmeFiles/howToLaunchVSCode/howToLaunch_vsc4.png)

6. Запустите Gulp введя команду ``gulp``.
*Если команда не сработает (ответит что-то вроде "не найдена такая команда"), попробуйте установить **gulp-cli**, введя ``npm -g install gulp-cli``.*
<br> Окно с главной страницей проекта будет открыта в вашем браузере по умолчанию (*если всё-таки не откроется, попробуйте перезагрузить её используя* ***ctrl + f5***)

<br>
</details>

<details>
<summary>В браузере</summary>
<br>

Скорее всего вы должны будете получить проект другим способом, но допустим, вам интересен именно этот вариант.

1. Скачайте проект **в виде ZIP файла**. 

![howToLaunch_vsc1](/readmeFiles/howToLaunchBrowser/howToLaunch_browser1.png)

2. Откройте архив и найдиите папку с выходными файлами проекта (скорее всего она не будет называться #src), разархивируйте её на ваш	ПК.
По необходимости вы можете получить макет дизайна этого сайта.

![howToLaunch_vsc1](/readmeFiles/howToLaunchBrowser/howToLaunch_browser2.png)

3. Найдите в папке файл **index.html** и запустите его в удобном для вас браузере.

</details>

<br>
Если у вас есть вопросы, вы можете написать мне на почту <a href="mailto:ccoldatheinrich@yandex.ru"> ccoldatheinrich@yandex.ru</a>
<br><br>

</details>


<details>
<summary>EN How to start?</summary>
<br> 

<details>
<summary>GitHub Pages (recommented)</summary>
<br>
You can run the project in the browser without downloading.

To do this, open [this site on GitHub Pages] 
<br> (i recommend disabling external modifiers for page properties, such as *dark-reader*.)
<br>
</details>

<details>
<summary>VS Code</summary>
<br>

1. Copy the path to the repository, **not forgetting to specify the branch you are interested in**. 

![howToLaunch_vsc1](/readmeFiles/howToLaunchVSCode/howToLaunch_vsc1.png)

2. Start Visual Studio Code, where by selecting the Explorer item, select **Clone repository**. 

![howToLaunch_vsc1](/readmeFiles/howToLaunchVSCode/howToLaunch_vsc2.png)

3. In the pop-up window, enter the previously copied path to the repository and select the folder where you want to save the files. 

![howToLaunch_vsc1](/readmeFiles/howToLaunchVSCode/howToLaunch_vsc3.png)

> *Make sure that the path to the project folder is specified in the terminal!* <br>
*And Make sure you have Python installed (most likely you will need version 2.7, if a newer one is installed, you may have to uninstall it).*

4. Enter terminal (**ctrl + j** or **view** -> **terminal**) ``npm i`` command.

5. If there are no errors in the process, you will see something like this: 

![howToLaunch_vsc1](/readmeFiles/howToLaunchVSCode/howToLaunch_vsc4.png)

6. Start Gulp from the terminal by entering the ``gulp`` command.
<br> If this command doesn't work (you probably wouldn't find it), try installing **gulp-cli** via ``npm -g install gulp-cli``.
<br> A window with the main page of the project will open in the browser by default (*if it does not load correctly, you may need to update it using* ***ctrl + f5***).

</details>

<details>
<summary>Just in a browser</summary>
<br>

Most likely, you will be given the folder with the project you are interested in in a different way, but if you are still interested in:
1. Download the project **via ZIP**. 

![howToLaunch_vsc1](/readmeFiles/howToLaunchBrowser/howToLaunch_browser1.png)

2. Open the archive and find the folder with the final files (most likely it will not be named #src), extract it to your PC.
If you're interested, you can download a mockup of the original design.

![howToLaunch_vsc1](/readmeFiles/howToLaunchBrowser/howToLaunch_browser2.png)

3. Run the **index.html** file in your browser.

<br>
</details>

<br>
If you have any questions or suggestions, write to me by email <a href="mailto:ccoldatheinrich@yandex.ru">ccoldatheinrich@yandex.ru</a>

</details>

<br>

<details>
<summary>RU Как пользоваться?</summary>
<br>

  > *Большинство правок происходит в папке **src**, папка с итоговыми файлами (называемая именем папки проекта) **создаётся и изменяется автоматически**.*
  * Скачайте изображения, в том числе векторные, из макета и добавьте их в папку img. Не поленитесь создать дополнительные папки в ней для удобства навигации.
  
  * Добавьте шрифты в папку **fonts**. Они будут автоматически подключены в файл fonts.sass и к главному файлу стилей - style.sass.
    > Будьте внимательны, файл fonts.sass перез записью **должен быть пуст**.
    ___
  * Добавьте иконочные шрифты, если они нужны. 
    * Файл стилей, переделанный под .sass, добавьте в папку sass с произвольным названием. Далее подключите её к главному файлу стилей - style.sass через 
    ``@import "yourIconFontsStylesName"``
    * Файлы непосредственно шрифтов добавляйте в папку fonts.
    ___


  * В файле _head.html настройте описание, добавьте favicon, предзагрузку файлов и настройте SEO.
  * Настройте слайдер Swiper, если он вам нужен, в файле _scripts.html.
  Если он вам не нужен, удалите строки подключения стиля в _head.html и скриптов в _script.html.
  
  * И наконец: <br>
    Удалите ненужные файлы стилей или скриптов; <br>
    Если вы используете систему контроля версий, удалите папку .git в корне проекта; <br>
    Запустите gulp (с.м "Как запустить?" => VS Code); <br>
    Верстайте! <br>
  Вы всегда можете проверить работоспособность сборщика, заглянув в итоковые файлы проекта. 

</details>

<details>
  <summary>EN How to use?</summary>
  <br>

  > *Most of the edits take place in the **src** folder, the resulting files folder (called the name of the project folder) **is created and modified automatically**.*
  
  * Download images, including vectors, from the layout and add them to the img folder. Do not be lazy to create additional folders in it for easy navigation.
  
  * Add fonts to **fonts** folder. They will be automatically included in the fonts.sass file and in the main stylesheet - style.sass.
    > Be careful, the fonts.sass file **must not contain any characters** before writing.
    ___
  * Add icon fonts if needed.
    * The stylesheet file, remade under .sass, add to the sass folder with an arbitrary name. Next, connect it to the main stylesheet - style.sass via
    ``@import "yourIconFontStyleFile"``
    * Add icon font files to the fonts folder.
    ___


  * In the _head.html file, customize the description, add a favicon, file preloaders, and set up SEO.
  * Customize the Swiper slider if you need it in the _scripts.html file.
  If you don't need it, remove the style connection lines in _head.html and scripts in _script.html.
  
  * And finally: <br>
      Delete unnecessary style and script files; <br>
      If you are using a revision control system, delete the .git folder at the root of the project; <br>
      Run gulp (see "How to start?" => VS Code); <br>
      Develop! <br>
  You can always check the functionality of the collector by looking at the final project files.
</details>

[этот сайт на GitHub Pages]: //ulyanov-programmer.github.io/Project
[this site on GitHub Pages]: //ulyanov-programmer.github.io/Project
