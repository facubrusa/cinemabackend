const connection = require('../config/db');

exports.getMovies = async (req, res) => {
    console.log(req.query);
    const { date } = req.query;

    const query = `SELECT
                        p.codigo AS idMovie,
                        p.nombre AS name,
                        p.duracion AS duration,
                        p.sinopsis AS description,	
                        IF(p.3d = TRUE, '3D', '2D') AS type,
                        cp.nombre AS classification
                    FROM 
                        tbl_funciones f INNER JOIN
                        tbl_peliculas p ON p.codigo = f.codigoPelicula INNER JOIN	
                        tbl_clasificaciones_peliculas cp ON cp._id = p.idClasificacion
                    WHERE
                        f.fecha = '${date}' AND		
                        f.activo = TRUE AND
                        p.activo = TRUE AND
                        p.cartelera = TRUE AND
                        f.PublicaWeb = 1
                    GROUP BY
                        p.codigo`;

    connection.query(query, (error, results) => {
        if(error) throw error;
        if(results.length > 0) {
            res.json(results);
        } else {
            res.status(404).json({ msg: "There is no movies"});
        }
    });
}