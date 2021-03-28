
const Chatbox = ({handleChat}) => {
    return (
        <div id="chatBox" className="sidebar">
            <a href="javascript:void(0)" className="closebtn" onClick={handleChat}>&times;</a>
            <h3 className = "text-center text-light"> Chat </h3>
            <div className = "sendMessage ml-2 mr-2">
                <form>
                    <div className = "form-group">
                    <p className = "text-light p-2"> Enter message here </p>
                    </div>
                    
                </form>
            </div>
        </div>

    )
}

export default Chatbox;
