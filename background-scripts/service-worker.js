chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  switch (reason) {
    case 'install':
      // if it is a new install, redirect to a page to get the user signed up
      // get the user's name pretty much
      const tabToShow = chrome.runtime.getURL('views/setup.html');
      await chrome.tabs.create({ tabToShow });
      break;
  }


  // add side panel functionality to the app
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch(err => console.error(err));

  // add context menus that allow users to highlight text and add to the sidepanel todo list
  chrome.contextMenus.create({
    id: 'selection-of-text',
    title: 'Add to your do list',
    contexts: ['selection']
  });

  chrome.contextMenus.onClicked.addListener(info => {
    console.log(info)
    const { menuItemId } = info;
    switch (menuItemId) {
      case 'selection-of-text':
        // functionality to add to the do list in the side panel and to storage
        const { selectionText } = info;
        break;
    }
  });
});