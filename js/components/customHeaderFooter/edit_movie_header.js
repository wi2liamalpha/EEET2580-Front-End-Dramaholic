let user = localStorage.getItem("UserID")
if (user == "" || user == null) {
    window.location.replace("../../index.html");
}
else {
// let current_user = sessionStorage.getItem('UserID')
fetch(`https://dramaholic.herokuapp.com/api/customers/${user}`)
.then((response) => response.json())
.then((user) => {
    let insertname = document.querySelectorAll(".navigation-menu-profile-name")
    for (let i=0; i<insertname.length; i++) {
        insertname[i].innerHTML = "Hi, " + user.username.toUpperCase()
    }
        
    if (user.admin == true) {
        let a = document.querySelectorAll(".admin-dashboard")
        for (let i=0; i<a.length; i++) {
            a[i].removeAttribute("hidden")
        }
    }
})
.catch((error) => {
    console.log(error); 
});
}

document.querySelector("header").innerHTML = `
<nav class="navbar nav-colored">
    <div class="nav-left">
        <span
        class="hamburger"
        style="font-size: 30px; cursor: pointer"
        onclick="openNav()"
        >&#9776;</span
        >

        <div id="sideNav" class="sideNav">
            <div class="navigation-menu-settings">
                <div class="flex_row" style="gap:0.5rem;">
                    <li class="has-inline-left-gutter navigation-menu-profile">
                        <img
                            src="https://occ-0-58-395.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYnnca7HCf0z4YHtIK5R8MIGCeMyodAsxBYSBmMkYHqjSw46VWWyNQirfwxT-CkbxPkp-G84Wu-iOMwGG-r9QAs.png?r=f71"
                            class="header-profile-avatar"
                        />
                    </li>
                    <li class="navigation-menu-profile-name"></li>
                </div>
                <div><a href="../../../pages/user/user_profile.html">Account</a></div>
                <div hidden class="admin-dashboard"><a href="../../../pages/movie/admin_dashboard.html">Admin Dashboard</a></div>
                <div><a href="../../pages/user/watch_history.html">Watching History</a></div>
            </div>
            <div class="navigation-menu-settings">
                <div><a href="../../../index.html">Home</a></div>
                <div><a href="../../../pages/movie/category.html">Category</a></div>
                <div><a href="../../../pages/movie/trending.html">Top Trending</a></div>
            </div>
            <div class="navigation-menu-settings">
                <div><a href="../../../pages/info/aboutUs.html">About @dramaholic</a></div>
                <div><a href="../../../pages/info/policy.html">Policy</a></div>
            </div>
            <div class="a" onclick=handleSignOut()>
                <button class="sign-in-subBar">SIGN OUT</button>
            </div>
        </div>
            
        <div class="page_title_nav" id="page_title_nav">EDIT MOVIE</div>
    </div>

   

    <div class="nav-right">
        <div class="hide_later dropdown" id="account_navigate">
            <div class="flex_row align_items_center" style="gap:0.5rem;">
                <span class="navigation-menu-profile-name"></span>
                <span class="down-arrow ti-angle-down" style="font-size:13px;"></span>
            </div>
            
            <div class="dropdown-content">
                <div>
                    <a href="../../pages/user/user_profile.html">
                        <span class="cuteicon ti-user"></span>
                        Account
                    </a>
                </div>
                <div>
                    <a href="../../pages/user/watch_history.html">
                        <span class="cuteicon ti-time"></span>
                        History
                    </a>
                </div>
                <div class="admin-dashboard" hidden>
                    <a href="../../pages/movie/admin_dashboard.html">
                        <span class="cuteicon ti-crown"></span>
                        Admin
                    </a>
                </div>
                <div class="a" onclick=handleSignOut()>
                    <a  href="#">
                        <span class="cuteicon ti-power-off"></span>
                        Sign Out
                    </a>
                </div>
            </div>
        </div>
        <div class="hide_later">|</div>
        <div class="image-container" id="logo_nav">
            <a href="../../index.html";"
            ><img src="../../assets/image/logo.png" alt="DramaHolic" class="logo"
            /></a>
        </div>
    </div>
</nav>
`;
