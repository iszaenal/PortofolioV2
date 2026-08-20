const root=document.documentElement;
const themeToggle=document.querySelector(".theme-toggle");
const themeIcon=document.querySelector(".theme-icon");
const menuToggle=document.querySelector(".menu-toggle");
const drawer=document.querySelector(".mobile-drawer");
const drawerBackdrop=document.querySelector(".drawer-backdrop");
const drawerClose=document.querySelector(".drawer-close");
const navLinks=[...document.querySelectorAll(".nav-link")];
const sections=[...document.querySelectorAll(".page-section")];

const savedTheme=localStorage.getItem("zaenal-theme");
if(savedTheme){root.dataset.theme=savedTheme;}
updateThemeIcon();

function updateThemeIcon(){
  const dark=root.dataset.theme==="dark";
  themeIcon.textContent=dark?"☾":"☼";
  themeToggle.setAttribute("aria-label",dark?"Switch to light mode":"Switch to dark mode");
}
themeToggle.addEventListener("click",()=>{
  root.dataset.theme=root.dataset.theme==="dark"?"light":"dark";
  localStorage.setItem("zaenal-theme",root.dataset.theme);
  updateThemeIcon();
});

function closeDrawer(){
  drawer.classList.remove("open");
  drawerBackdrop.classList.remove("open");
  drawer.setAttribute("aria-hidden","true");
  menuToggle.setAttribute("aria-expanded","false");
}
menuToggle.addEventListener("click",()=>{
  drawer.classList.add("open");
  drawerBackdrop.classList.add("open");
  drawer.setAttribute("aria-hidden","false");
  menuToggle.setAttribute("aria-expanded","true");
});
drawerClose.addEventListener("click",closeDrawer);
drawerBackdrop.addEventListener("click",closeDrawer);
document.querySelectorAll(".mobile-nav a").forEach(a=>a.addEventListener("click",closeDrawer));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id=entry.target.id;
      navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")===`#${id}`));
    }
  });
},{rootMargin:"-35% 0px -55% 0px",threshold:0});
sections.forEach(section=>observer.observe(section));

const projectData={
 network:{type:"NETWORKING",title:"Network Device Installation",description:"Installation and configuration work involving network infrastructure and field implementation.",work:"Supported the installation, configuration, checking, and documentation of network devices in field environments.",tools:"Network devices · TCP/IP · Configuration · Field troubleshooting"},
 fortigate:{type:"FIREWALL",title:"FortiGate Implementation",description:"Field documentation and implementation involving FortiGate firewall infrastructure.",work:"Worked with installation activities and technical documentation around firewall deployment and connectivity.",tools:"FortiGate · Firewall · Networking · Technical documentation"},
 documentation:{type:"DOCUMENTATION",title:"Network Installation Documentation",description:"Technical documentation of installation activities and field work.",work:"Organized installation evidence, project information, and field documentation so work could be reviewed and reported clearly.",tools:"Documentation · Project support · Reporting"},
 ad:{type:"SYSTEM LAB",title:"Windows Server & Active Directory Lab",description:"A hands-on domain environment built for practicing centralized Windows administration.",work:"Configured Windows Server 2022, Active Directory, users and groups, DHCP, Group Policy, permissions, and Windows 10 client integration.",tools:"VMware · Windows Server 2022 · AD DS · DHCP · GPO · Windows 10"},
 pnetlab:{type:"NETWORK SIMULATION",title:"PNetLab Network Simulation",description:"Virtual network topologies used to practice routing, switching, and troubleshooting.",work:"Built lab topologies and practiced device configuration, addressing, routing, and connectivity testing in a virtual environment.",tools:"PNetLab · Cisco · MikroTik · Linux · Routing · Switching"},
 web:{type:"WEB",title:"Portfolio V2",description:"A cleaner portfolio experience designed around professional presentation and practical IT work.",work:"Redesigned the information architecture, responsive layout, theme system, project presentation, and navigation while keeping the site lightweight.",tools:"HTML · CSS · JavaScript · GitHub Pages"},
 linux:{type:"SYSTEM LAB",title:"Linux Server Administration Lab",description:"Hands-on Linux server practice covering basic system administration, networking, user management, permissions, and service configuration.",work:"Practiced Linux server administration including user management, file permissions, networking configuration, and basic service management.",tools:"Ubuntu Linux · Terminal · Networking Tools · Virtual Machine"}
};

const modal=document.querySelector(".project-modal");
const modalTitle=document.querySelector("#modal-title");
const modalType=document.querySelector("#modal-type");
const modalDescription=document.querySelector("#modal-description");
const modalTags=document.querySelector("#modal-tags");
const modalWork=document.querySelector("#modal-work");
const modalTools=document.querySelector("#modal-tools");

function openProject(key){
  const p=projectData[key]; if(!p)return;
  modalType.textContent=p.type;
  modalTitle.textContent=p.title;
  modalDescription.textContent=p.description;
  modalWork.textContent=p.work;
  modalTools.textContent=p.tools;
  modalTags.innerHTML=p.tools.split(" · ").map(x=>`<span>${x}</span>`).join("");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeProject(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
document.querySelectorAll(".project-open").forEach(btn=>btn.addEventListener("click",()=>openProject(btn.dataset.project)));
document.querySelector(".modal-close").addEventListener("click",closeProject);
document.querySelector(".modal-backdrop").addEventListener("click",closeProject);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeProject();closeDrawer();}});

if(location.hash){
  setTimeout(()=>document.querySelector(location.hash)?.scrollIntoView({behavior:"smooth"}),80);
}
