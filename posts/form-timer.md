---
title: 'How to Schedule Google Forms to Open and Close on Specific Dates'
date: 2025-05-05
author: Ukpai Ugochi Ibem
gravatar: 1t7YghWTfjB5qXTRAQR3BucJF-9qUk_Ie
twitter: '@hannydevelop'
---

<img src="https://drive.google.com/thumbnail?id=1mBdSCpeDQysMqmMfX3Kd8FjKWTX2Yomk&sz=w1000" alt="The future is no-code"  style="width:40vw; margin:2em auto;">

Scheduling a Google Form to open and close on specific dates is not possible natively in Google Forms. However, you can achieve it in a few ways using [Google Apps Script (the Google API language)](https://developers.google.com/apps-script), third-party tools like [Proctored](https://proctored.peppubuild.com), or manual methods.

---

# Table of Contents
1. [Automating with Apps Script](#automating-with-apps-script)
2. [Scheduling with Add-on](#scheduling-with-add-on)
3. [Manually Limit Response](#manually-limit-response)
4. [Bonus: Embeding Forms in Websites](#bonus-embeding-forms-in-websites)

## Automating with Apps Script

Apps Script is a scripting platform (JavaScript) developed by Google to integrate with and automate tasks across Google Workspace Platform. To start with this method, you should have a working knowledge of JavaScript. 

<img src="https://drive.google.com/thumbnail?id=1rlRD7f3rw066dFh6XoWRyI_V_FyNsG3v&sz=w1000" alt="The future is no-code"  style="width:40vw; margin:2em auto;">

The first step for automating Google Form response with Apps Script, is by clicking on the menu button as shown in the image above. Next, click on Apps Script and you will be directed to an empty workspace.  

Here, we'll write our logic in `Code.gs`. First, empty `Code.gs`and we will add a menu from where we can schedule the Form availability. In `Code.gs`, add the code below.

```js
// onOpen runs this script when the Form is opened.
function onOpen() {
// getUi gets the Form UI to add menu.
  FormApp.getUi()
    .createAddonMenu()
    // This adds the menu item and corresponding function.
    .addItem("Schecule Form Response", "showTimer")
    .addToUi();
}
```

Now when you navigate to your Form you will see the add-on button, click on it. Choose your project name; in our case, it is **Untitled**. When you click on `Schecule Form Response`, you will get an error as shown below, since we have not written the `showTimer` function.

<img src="https://drive.google.com/thumbnail?id=1ilxoEJ4zox0MtNBWd9qMlzt_fTtArt5_&sz=w1000" alt="The future is no-code"  style="width:40vw; margin:2em auto;">

In `Code.gs`, we will write the `showTimer` function as shown below:

```js
// Create timer sidebar
function showTimer() {
// Create sidebar from HTML file named timebar.html
  var html = HtmlService.createHtmlOutputFromFile('timebar.html')
// Add a title for the sidebar
    .setTitle("Timeline Setting")
// Set the width and height of the sidebar
    .setWidth(300)
    .setHeight(200);
// Show sidebar
  FormApp.getUi().showSidebar(html);
}
```

We'll also get an error if we try to run this. Therefore, we will create a `timebar.html` file in our project. To do this, we will click on the `Add File` button and choose `HTML`. You'll be prompted to name the file. In this new file, we'll add the code below. This will show a Date/Time picker as well as run a trigger when the user clicks on the **Save Availability** button.

```html
<!DOCTYPE html>
<html>

<head>
  <base target="_top">
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    h3 {
      margin-bottom: 20px;
    }

    label {
      font-weight: bold;
      margin-top: 15px;
      display: block;
    }

    input {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    button {
      margin-top: 20px;
      padding: 10px 15px;
      background-color: #1a73e8;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
    }

    button:hover {
      background-color: #155cc4;
    }
  </style>
</head>

<body>
    <!-- Your comment here -->
  <h3>Schedule Form Response</h3>

  <label for="startTime">Start Time:</label>
  <input type="datetime-local" id="startTime" />

  <label for="endTime">End Time:</label>
  <input type="datetime-local" id="endTime" />

  <button onclick="saveDates()">Save Availability</button>

  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script>
    // The saveDates function that triggers automatic form response management.
    function saveDates() {
        // Implement a start date/time when form will start receiving response
        const start = document.getElementById('startTime').value;
        // Implement an end date/time when form will stop receiving response
        const end = document.getElementById('endTime').value;

        // Ensure start and end date are entered.
        if (!start || !end) {
          Swal.fire({
            icon: 'warning',
            title: 'Missing Input',
            text: 'Please enter both start and end date/time.'
          });
          return;
        }

        // add a success alert, when availability is set
        google.script.run
        .withSuccessHandler(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Form will open and close automatically at the set times.'
          });

          // Optionally clear the form inputs here
          document.getElementById('startTime').value = '';
          document.getElementById('endTime').value = '';
        })

        // Save dates to properties and start a trigger.
        .saveDatesToProperties(start, end);
      }
  </script>
</body>

</html>
```
We'll also get an error when we run the code since there's no function named `.saveDatesToProperties` yet. Hence, we will write that function in `Code.gs`.

```js
// Save Date and Time from sidebar
function saveDatesToProperties(startTime, endTime) {
  // save property so the trigger can get the start and end time of each form. 
  const props = PropertiesService.getDocumentProperties();
  props.setProperty('startTime', startTime);
  props.setProperty('endTime', endTime);

  // Clear previous triggers
  removeAvailabilityTriggers();

  // Schedule new ones
  scheduleTrigger(new Date(startTime), 'openForm');
  scheduleTrigger(new Date(endTime), 'closeForm');
}

// schedule trigger for form
function scheduleTrigger(dateTime, handlerFunction) {
  const now = new Date();

  if (dateTime <= now) {
    // If the time is in the past or now, run the handler immediately
    if (handlerFunction === 'openForm') {
      openForm();
    } else if (handlerFunction === 'closeForm') {
      closeForm();
    }
    return;
  }

  // If scheduling openForm in the future, close the form now to prevent early access
  if (handlerFunction === 'openForm') {
    closeForm(); // Ensure form starts closed
  }

  // Schedule the trigger
  ScriptApp.newTrigger(handlerFunction)
    .timeBased()
    .at(dateTime)
    .create();
}

// remove existing trigger, if user tries to change close time.
function removeAvailabilityTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  const handlers = ['openForm', 'closeForm'];
  for (let trigger of triggers) {
    if (handlers.includes(trigger.getHandlerFunction())) {
      ScriptApp.deleteTrigger(trigger);
    }
  }
}

// open form and receive response
function openForm() {
  const form = FormApp.getActiveForm();
  form.setAcceptingResponses(true);
}

// close form
function closeForm() {
  const form = FormApp.getActiveForm();
  form.setAcceptingResponses(false);
}
```

Now when you click on the menu, you will be required to required to give access so that Forms access some scopes. Finally, you can now set the timeline for your Form's response.

## Scheduling with Add-on
The problem with automating with Apps Script is that you need to understand how programming works as well as Apps Script. Also, Apps Script is limited to the Google Form until you deploy and publish it as an Add-on. Finally, when you access functions that need an external scope, you need to apply for Google OAuth verification; else, you will be stuck with an unverified page.

Therefore, the easier option will be using an Add-on. [Proctored by Peppubuild](https://workspace.google.com/marketplace/app/proctored_by_peppubuild/890175963480) provides an ability to schedule your Form's response availability. First, install the add-on.

Next, open your form and click on the add-on button. Select `Proctored by Peppubuild` and choose `Configure Timeline`. Now, set the start and end date in the timeline.

<img src="https://drive.google.com/thumbnail?id=15MbOamaMdsuiVmAiu-xOSeHmeXUZyj3p&sz=w1000" alt="The future is no-code"  style="width:40vw; margin:2em auto;"> 

## Manually Limit Response
This method allows you to manually accept response or close response. If you have published the Form, click on the `Published` button and switch to accept response or close response as shown in the image below.

<img src="https://drive.google.com/thumbnail?id=12UFumQRADZ-sEcqEF7rafUje3XbVPsZ_&sz=w1000" alt="The future is no-code"  style="width:40vw; margin:2em auto;">

## Bonus: Embeding Forms in Websites
With this method, you can use a web app wrapper — to show/hide the Form based on time. You can use a web page and embed the Form using an [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe).

```html
<!-- Exam container (hidden until iframe is ready) -->
        <div id="form-container">
            <iframe id="examFrame"></iframe>
        </div>
```

```js
const formLink = `https://docs.google.com/forms/d/${formId}/viewform`;
const iframe = document.getElementById("examFrame");

// Save form link
iframe.src = formLink;
```

With this setup, we can set a timeline, check the current time and either:

- Show the embedded form

- Show a message like “Form not available yet”

However, the problem with this setup is that the form will still be available outside the iframe and users who have the formId will still be able to access the form.

## Final Thoughts
In this tutorial, we have explored the different ways of scheduling Google Forms, including the use of add-ons like Proctored by Peppubuild. 

| Method                    | No Code | Auto Open/Close    | Best For                                |
|---------------------------|----------------|---------------------|------------------------------------------|
| Google Apps Script        | ❌ No          | ✅ Yes              | Tech-savvy users, Full control           |
| Proctored Add-on          | ✅ Yes         | ✅ Yes              | Simple use cases, Full control           |
| Manual Setup              | ✅ Yes         | ❌ (non automated)  | Full control                             |
| Custom Wrapper, Embedding | ❌ No          | ✅ Yes              | Tech-savvy users                         |


Try out [Proctored by Peppubuild](https://proctored.peppubuild.com) and all of its features as we build a fool-proof proctored exam solutions using Google Forms.

---
**Keywords:** proctored by Peppubuild, Peppubuild exam proctoring, proctor Google Forms, Google Forms proctoring tool,
    online exam proctoring with Google Forms, Peppubuild secure testing, Peppubuild proctored Google Forms,
    how to proctor Google Forms with Peppubuild, best tool to proctor Google Form exams, set time limit and proctor Google Forms,
    Google Forms camera and screen monitoring, remote exam monitoring for Google Forms, Peppubuild exam timer for Google Forms,
    secure student exams using Google Forms, timed Google Forms with screen recording, auto-close Google Forms on time,
    student activity monitoring in Google Forms, Google Form with camera access for exams, Google Forms cheat prevention tools,
    record screen during Google Form exam, teachers proctoring Google Forms, remote learning exam tools,
    secure Google Form for schools, Google Forms for online assessments, online exam tool for students.