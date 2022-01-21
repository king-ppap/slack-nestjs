export default {
  help: {
    id: "test_button_msg",
    name: "test",
    description: "Approve quotation",
  },
  handler: async ({ ack, client }) => {
    await ack();
    try {
      await client.chat.postMessage({
        channel: process.env.START_CHANEL_ID,
        "attachments": [
          {
            "color": "#F2C94C",
            "blocks": [
              {
                "type": "divider"
              },
              {
                "type": "header",
                "text": {
                  "type": "plain_text",
                  "text": `Test button ${new Date().toISOString()}`,
                  "emoji": true
                }
              },
              {
                "type": "divider"
              },
              {
                "type": "actions",
                "elements": [
                  {
                    "type": "button",
                    "style": "primary",
                    "text": {
                      "type": "plain_text",
                      "text": "Approve",
                      "emoji": true
                    },
                    "value": "idOfQt",
                    "action_id": "QTapprove"
                  },
                  {
                    "type": "button",
                    "style": "danger",
                    "text": {
                      "type": "plain_text",
                      "text": "Deny",
                      "emoji": true
                    },
                    "value": "idOfQt",
                    "action_id": "QTdeny"
                  }
                ]
              },
            ],
          }
        ]
      });
    } catch (error) {
      console.log(error);
    }
  },
}
