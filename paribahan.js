let clickedSeats = []; 

function colorChange(seatid){

 const maxChoice = 4;

 const seat = document.getElementById(seatid);
//  seat.style.backgroundColor = "green";
//  seat.style.color = "white"
//  seat.disabled = true;

 if(clickedSeats.includes(seatid)){
   let seatIndex = clickedSeats.indexOf(seatid);
    clickedSeats.splice(seatIndex, 1);
    const seat = document.getElementById(seatid);
    seat.style.backgroundColor = "";
    seat.style.color = "";
    seat.disabled = false;
 }
 else{
    if(clickedSeats.length >= maxChoice){
        alert("You can't select anymore limit reached");
        return;
    }
 }

 clickedSeats.push(seatid);
 seat.style.backgroundColor = "green";
 seat.style.color = "white"
 seat.disabled = true;



 const seatAse = document.getElementById('seatVacant');
 let seatLeft = parseInt(seatAse.textContent);

 if(seatLeft>0){
    seatLeft--;
    seatAse.textContent = seatLeft;
 }



 const couponInput = document.getElementById('inputCoupon');
 const applyCoupon = document.getElementById('applyCoupon');
 if(clickedSeats.length === 4) {
    couponInput.disabled = false;
    applyCoupon.disabled = false;
 } 
 else{
    couponInput.disabled = true;
    applyCoupon.disabled = true;
 }
 
 couponValidate();
 seatCount();
 selectSeat();
 totalCostShow();
 grandTotalCostShow();
 nextUpdate();
}
 
// function seatSelectLimit(){
//     if(clickedSeats.length >= 4){
//         alert("You can't select anymore limit reached");
//         return;
//     }

// }

let count = 0;
function seatCount(){
  const  seatNise = document.getElementById('seatTaken');
  count++;

  seatNise.style.display="inline";
  seatNise.textContent = count;
  
}

function selectSeat(){
    let newR = document.createElement('tr');
    let seatC = document.createElement('td');
    seatC.textContent= 'C2'
    let classC = document.createElement('td');
    classC.textContent = 'Economy'
    let priceC = document.createElement('td');
    priceC.textContent = 550;

    newR.appendChild(seatC);
    newR.appendChild(classC);
    newR.appendChild(priceC);

    let tableNewAdded = document.getElementById('tableNew');
     tableNewAdded.appendChild(newR);

     document.getElementById('nextButton').disabled = false;

}

function totalCostShow(){
    let costTotal = 0;
    let costValue = document.querySelectorAll('#tableNew td:nth-child(3)');

    for(let costF of costValue){
        costTotal += parseInt(costF.textContent);
    }
 
    document.getElementById('totalCost').textContent = costTotal;
}


function grandTotalCostShow(discountPer = 0){
    let grandTotal = 0;
    let costValue = document.querySelectorAll('#tableNew td:nth-child(3)');
    for(let grandF of costValue){
        grandTotal += parseInt(grandF.textContent);
    }

    if(discountPer > 0){
        grandTotal = grandTotal * ((100-discountPer)/100);
    }

    document.getElementById('grand-total').textContent = grandTotal.toFixed(2);
}


document.getElementById('applyCoupon').addEventListener('click',  couponValidate);

function  couponValidate(){
    const validCoupon = {'NEW15':15,
                         'Couple 20':20}; 
    const couponInput = document.getElementById('inputCoupon');
    const entry = couponInput.value;
     
    if(entry in validCoupon){
        const  discountPer = validCoupon[entry];
        alert('applied succesfully');
        couponInput.style.display='none';

        document.getElementById('applyCoupon').style.display = 'none';
        grandTotalCostShow(discountPer);
    }

    // if(validCoupon.includes(entry)){
    //     alert("coupon code applied succesfully!");
    //     couponInput.style.display='none';

    //     document.getElementById('applyCoupon').style.display = 'none';
    //     grandTotalCostShow(discountPer);
    // }
    // else{
    //     alert('please enter a valid code');
    // }

}

document.getElementById('nextButton').addEventListener('click',function(){
 document.getElementById('my_modal_3').showModal();
})


function nextUpdate(){
    
    const table = document.getElementById('tableNew');
    const rowAse = table.getElementsByTagName('tr').length>0;
    document.getElementById('nextButton').disabled = !rowAse;
}


document.getElementById('continuebtn').addEventListener('click',function(){
    document.getElementById('my_modal_3').close();
    window.location.href = 'index.html';
})


document.getElementById('seeofferBtn').addEventListener('click',function(){
    document.getElementById('viewPage').scrollIntoView({
        behavior: 'smooth'
    });
});