
*General*
For editing styles I used Sass. Sass gives CSS the power to utilize things such as variables and calculations. 
More information can be found here https://sass-lang.com/guide on how to run and use Sass
- To edit styles edit the styles edit the .scss files
- All the .scss files link to the main.scss file which then gets compiled to style.css (aka the file that the actual webpage sees)


*SCSS Folder Structure*
base: basic global styles, variables
pages: main styles of the page templates
components: unique styles of individual UI elements such as switches, checkboxes, an tabs



*Mobile Responsiveness on the Lemma inner page*
When the webpage shrinks to mobile the ".info-section", "#areadesk", & '.page-btn' hide. 
These elements are designated for the desktop experience
They are replaced by the '.tab-section', which houses the content of both the 
'.info-section' and '#areadesk',as well ass the '.bottom-nav' which house the mobile 
version of the pagination buttons, '.mobile-page-btn'.

*Content Editing*

**Text copy**
Because I duplicated the text areas for mobile I wanted to create a way to allow you 
to only have to edit the content of the 'Claim" and 'Proof' sections once. 
To do so I utilize a function that grabs the innerHTML of the section and 
populates its contents in its appropriate mobile counterpart/

**Checkbox section**
The checkmark areas are duplicated as well but unfortunately I have not found 
a fix yet to make it easier to update. Therefore this area has to be updated in 2 places,
for desktop and mobile.

To map the two checkbox areas to eachother( so that when something is checked on 
desktop it will visually appear checked on mobile) I created this hacky code found in 
the file 'checkbox.js' located in the 'src' folder


**Model Styles**
For the model styles I am wrapping the lemma page in an ID (e.g. "#lemma2") and targeting the elements within that id to change their colors. You can find the file to edit these colors in the model.scss file.