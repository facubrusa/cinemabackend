const db = require('../config/db');

exports.getSessions = async (req, res) => {
    const { date } = req.query;

    try {
        const movies = await getMovies(date);
        const sessions = await getSessions(date);
        res.status(200).json({movies, sessions});
    } catch (error) {
        console.log(error);
    }
}

const getMovies = date => {

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

    return new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            return (error) ? reject(error) : resolve(results);
        });
    });
}

const getSessions = date => {

    const query = `SELECT
                        f._id AS idSession,
                        f.codigoPelicula AS idMovie,
                        DATE_FORMAT(f.fecha, '%Y-%m-%d') AS date,
                        f.hora AS time,
                        CONCAT(f.fecha, ' ', f.hora) AS start
                    FROM
                        tbl_funciones AS f 
                    WHERE			
                        f.fecha = '${date}' AND
                        f.activo = TRUE 		 
                    GROUP BY
                        f._id
                    ORDER BY
                        start ASC;`;

    return new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            return (error) ? reject(error) : resolve(results);
        });
    });
}