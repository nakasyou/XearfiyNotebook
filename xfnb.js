window.xfnb={
  async start(elem){
    const versionResp=await fetch("https://raw.githubusercontent.com/nakasyou/XearfiyNotebook/main/.latest");
    const version=await versionResp.text();
    const htmlResp=await fetch(`https://cdn.jsdelivr.net/gh/nakasyou/XearfiyNotebook@${version}/index.html`);
    const html=await htmlResp.text();
    const jsResp=await fetch(`https://cdn.jsdelivr.net/gh/nakasyou/XearfiyNotebook@${version}/script.js`);
    const js=await htmlResp.text();
    alert(js);
  }
}