
const animateOnVisibilityTrue = (element, animationClasses=[], prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
    

    let classes= [];
    for(let i=0; i < animationClasses.length; i++){       
        classes.push(`${prefix}${animationClasses[i]}`);       
    }
    
    const nodeList = document.querySelectorAll(element);

    let node;
    for (let i=0; i < nodeList.length; i++){
        node = nodeList[i];
        node.classList.add(`${prefix}animated`);
        classes.forEach((clas)=>{
            node.classList.add(clas);
        });
        
        node.addEventListener('animationend', handleAnimationEnd, {once: true});
    }
    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd() {
        for (let i=0; i < nodeList.length; i++){
            node = nodeList[i];
            node.classList.remove(`${prefix}animated`);
            classes.forEach((clas)=>{
                node.classList.remove(clas);
            });
        }        
        resolve('Animation ended');
    }

    
});



document.addEventListener('visibilitychange', function(e) {
    if(e){
    //   
    };
    animateOnVisibilityTrue('.animate-on-visibility', ['pulse', 'slow' ]);    
});

