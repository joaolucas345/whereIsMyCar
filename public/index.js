function Start()
{
    const expandBtn = Array.from(document.querySelectorAll("#btn"))
    expandBtn.map((btn , index) => {
        if(index == 0){
            const expandHandler = () => {
                expandBtn.forEach((b,i) => {
                    // if(!i) (Array.from(b.classList).includes("popup") ? b.classList.remove("popup") : b.classList.add("popup")
                })
            }
            btn.onclick = expandHandler
            return
        }
    })
}

Start()