# hubspot-subscriptions-Email-Preferences-Manager
A lightweight JavaScript utility that enhances email subscription forms by dynamically capturing unsubscribe reasons from users.
Email-Preferences-Manager
A lightweight JavaScript utility that enhances email subscription forms by dynamically capturing unsubscribe reasons from users.
Features

Dynamic Unsubscribe Feedback: Automatically displays a feedback form when users unsubscribe from email communications
HubSpot Integration: Seamlessly submits user feedback to HubSpot via the Forms API
User-Friendly Interface: Shows/hides the feedback form based on user actions
Easy Implementation: Simple to add to existing email preference centers

How It Works
This script monitors changes to subscription checkboxes on your email preferences page. When a user unchecks any subscription option, a form appears asking for their unsubscribe reason. If they later re-check all subscriptions, the feedback form disappears.
The collected feedback is automatically submitted to HubSpot when the user saves their preferences, providing valuable insights into why users unsubscribe.
Implementation

Add the script to your email preferences page
Ensure your form has the ID email-prefs-form
Make sure subscription checkboxes are properly tagged with type="checkbox"
Verify your submit button has the ID submitbutton

Configuration
The script is configured to submit data to a specific HubSpot form. Update the following values for your implementation:
javascriptconst url = `https://api.hsforms.com/submissions/v3/integration/submit/<portal-id>/<form-id>`;

Dependencies

Requires a modern browser with support for ES6 features
Designed to work with HubSpot forms, but can be adapted for other platforms

License
MIT
