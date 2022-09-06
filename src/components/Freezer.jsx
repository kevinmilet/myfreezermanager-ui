import React from 'react';

const Freezer = ({freezer}) => {
console.log(freezer)
   return (
       <div className="freezer">
           {/*<div className="book-image">
               <img src={bookImg} alt="Book"/>
           </div>*/}
           <div>
               Nom: {freezer.nom}
           </div>
           <div>
               Type: {freezer.typeCongelateur.nom}
           </div>
       </div>
    );
};

export default Freezer;
