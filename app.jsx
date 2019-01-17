class Comment extends React.Component{
    render(){
        return(
            <div>
                <div>
                    {this.props.children}
                </div>
                <div>
                   - {this.props.author}
                </div>
            </div>
        );
    }
}

class CommentForm extends React.Component{

    handleSubmit(e){
        e.preventDefault();
        const author=this.refs.author.getDOMNode().value.trim();
        const body=this.refs.body.getDOMNode().value.trim();
        const form=this.refs.form.getDOMNode();
        this.props.onSubmit([{"author":author,"body":body}]);
        form.reset();
    }

    render(){
        return(
            <form ref="form" onSubmit={(e)=>{this.handleSubmit(e)}}>
                <input type="text" placeholder="your name" ref="author"/>
                <input type="text" placeholder="comment" ref="body"/>
                <input type="submit" value="add"/>
            </form>
        );
    }
}

class CommentList extends React.Component{

    render(){
       var commentsNode=this.props.commentsl.map(function(comment,index){
            return <Comment key={"comment-"+index} author={comment.author}>{comment.body}</Comment>;
       });
        return(
            <div>
                
                    {commentsNode}
                
            </div>
        );
    }
}



class CommentBox extends React.Component{

    constructor(props){
        super();
        this.state={
            commentsl:props.comments||[]
        };
    }

    loadDataFormServer(){
        $.ajax({
            url:this.props.url,
            datatype:"json",
            success:comments=>{
                this.setState({commentsl:comments});
            }
        });
    }

    componentDidMount(){
        this.loadDataFormServer();
    }

    handleNewComment(comment){
        $.ajax({
            url:this.props.url,
            datatype:"json",
            type:"post",
            data:comment,
            success:(comments)=>{
                this.setState({commentsl:comments});
            },
            error:(xhr,status,err)=>{
                alert("da");
               this.setState({commentsl:comment});
            }
        });
    }

    render(){
        return(
            <div>
                <h1>Comments</h1>
                <CommentList commentsl={this.state.commentsl}/>
                <CommentForm onSubmit={comment=>this.handleNewComment(comment)}/>
            </div>
        );
    }
}

box=React.render(
    <CommentBox url="comments.json"/>,
    document.getElementById("content")
);

