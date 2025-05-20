<%*
const todos = {
    "- [/]": "incomplete",
    "- [-]": "canceled",
    "- [>]": "forwarded",
    "- [<]": "scheduling",
    "- [\"]": "quote",
    "- [?]": "🟧 question",
    "- [!]": "🟥 important",
    "- [*]": "🟧 star",
    "- [l]": "📍 location",
    "- [b]": "🟥 bookmark",
    "- [i]": "🟦 information",
    "- [S]": "💰 savings",
    "- [I]": "🟦 idea",
    "- [p]": "🟩 pros",
    "- [c]": "🟥 cons",
    "- [f]": "🔥 fire",
    "- [k]": "🟧 key",
    "- [w]": "🎂 win",
    "- [u]": "🟩 up",
    "- [d]": "🟥 down"
};

const typeNames = [];
const typeLabels = [];

Object.keys(todos)
	.sort() // Remove this line to use predefined order.
	.forEach(key => 
		typeNames.push(key) && typeLabels.push(todos[key])
	);

let todoType = await tp.system.suggester(
	typeLabels,
	typeNames,
	false,
	"Select todo type."
);

// Stop here when the prompt was cancelled (ESC).
if (!todoType) {
  return;
}

let todo = await tp.file.selection();
if (!todo) {
	todo = await tp.system.prompt("To Do Text", "");
}
_%>

<% todoType %> <% todo %><%* tp.file.cursor() %>