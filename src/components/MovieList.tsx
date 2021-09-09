import React from 'react';

const MovieList: React.FC = () => {
  return (
    <>
            { [0, 1, 2, 3, 4, 5, 6,].map((i) => 
          <div key={i}>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad illo, in nesciunt libero tempora pariatur, minima, vitae deleniti ipsam quia ex hic. Non, fuga fugit aut ullam corporis sapiente esse.</p>
          </div>
        )}
    </>
  )
}

export default MovieList;