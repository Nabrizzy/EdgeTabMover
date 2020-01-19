chrome.commands.onCommand.addListener(commandListener);
async function commandListener(event) {
    let a = await getCurrentTab();
    if (event === 'tabLeft'){
        let b = a.b-1;
        if (b < 0)
            b = await getLastIndex();
        chrome.tabs.move(a.a, {index: b});
    } else if (event === 'tabRight'){
        let b = a.b+1;
        let c = await getLastIndex();
        if (b > c)
            b = 0;
        chrome.tabs.move(a.a, {index:b});
    } else if (event === 'dockLeft'){
        chrome.tabs.move(a.a, {index:0});
    } else if (event === 'dockRight'){
        let b = await getLastIndex();
        chrome.tabs.move(a.a, {index:b});
    }
}
async function getCurrentTab() {
    return new Promise(a => {
        chrome.tabs.getSelected(b => {
            a({a:b.id,b:b.index});
        });
    });
}
async function getLastIndex() {
    return new Promise(a => {
        chrome.tabs.getAllInWindow(b => {
            a(b.length-1);
        });
    });
}