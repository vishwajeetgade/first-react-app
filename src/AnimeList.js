import Anime from './Anime';
import PropTypes from 'prop-types';

function AnimeList(props) {
    return (
        <div>
            <div className="row">
                {props.animeChars.map((char, index) => (
                    <div className="col-sm-3 px-3 py-2" key={index}>
                        <div className="card" style={{ width: "18rem" }}>
                            <img src={char.img} className="card-img-top" alt={char.name + " image"} />
                            <div className="card-body">
                                <h5 className="card-title">{char.name}</h5>
                                <p className="card-text">{char.desc}</p>
                                <h6 className="card-title">Skills</h6>
                                <ul>
                                    {
                                        char.skills.map((skill, index)=>(
                                            <Anime skill={skill} key={index}/>
                                        ))
                                    }
                                </ul>
                                <button name={char.id} type="button" className="btn btn-sm btn-danger" onClick={() => props.onDelete(char.id)}>delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


AnimeList.propTypes = {
    animeChar: PropTypes.arrayOf(PropTypes.object),
    onDelete: PropTypes.func
}

AnimeList.defaultProps = {
    onDelete() { }
}

export default AnimeList;
