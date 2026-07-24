function Student(props: any) {
    return (
        <h1>Hello, {props.name}</h1>
    );
}
 
function Details(props: any) {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>Age: {props.age}</p>
            <p>City: {props.city}</p>
        </div>
    );
}
 
function Props() {
    return (
        <div>
            <Student name="Emma" />
            <Student name="Jack" />
        
            <Details name="Riya" age="25" city="New York" />
            <Details name="Ahaan" age="22" city="Los Angeles" />
            <Details name="John" age="28" city="Chicago" />
        </div>
    );
}
 
export default Props;