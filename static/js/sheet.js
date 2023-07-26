
const findBlock = async (val) => {

    // deselect the block
    if (val == "" || val == 'clear' || val == "c") {
        let resetBlock = document.getElementsByClassName("selected")
        // console.log("arr", resetBlock.length)
        if (resetBlock) {
            while (resetBlock.length > 0) {
                resetBlock[0].classList.remove("selected")
            }
        }
        return;
    }

    let arr = val.split('_')
    let fNum = arr[0]
    let str = arr[1]

    let mult = str.charCodeAt(0) - 64

    if (str.length == 2) {
        let secondNum = str.charCodeAt(1) - 64
        let base = mult * 26
        val = fNum + '_' + (base + secondNum)

    } else {
        val = fNum + '_' + mult
    }

   




    // select the block

    let block = document.getElementById(val)

    if (block) {
        block.classList.add("selected")

    }
   

}




