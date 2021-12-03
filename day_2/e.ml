let file_name = "input.txt"

let read_lines file_name : string list =
  let ic = open_in file_name in
  let try_read () =
    try Some (input_line ic) with End_of_file -> None in
  let rec loop acc = match try_read () with
    | Some s -> loop (s :: acc)
    | None -> close_in ic; List.rev acc in
  loop []

type movement = {
  kind: string;
  value: int
}

let () =
    let exercise_1 movements =
      let depth, distance = List.fold_left (fun acc v ->
        let depth, distance = acc in
        match v with
        | {kind = "forward"; value} -> (depth, distance + value)
        | {kind = "up"; value} ->  (depth - value, distance)
        | {kind = "down"; value} ->  (depth + value, distance)
        | _ -> failwith "ERROR"
      ) (0, 0) movements in
      depth * distance
    in

    let exercise_2 movements =
      let depth, distance, _ = List.fold_left (fun acc v ->
        let depth, distance, aim = acc in
        match v with
        | {kind = "forward"; value} -> (depth + aim * value, distance + value, aim)
        | {kind = "up"; value} ->  (depth, distance, aim - value)
        | {kind = "down"; value} ->  (depth, distance, aim + value)
        | _ -> failwith "ERROR"
      ) (0, 0, 0) movements in
      depth * distance
    in

    let lines = read_lines file_name in
    let parse_input s =
      match String.split_on_char ' ' s with
      | kind :: value :: _ ->
        { kind = kind;
          value = int_of_string value}
      | _ -> failwith "ERROR"
    in
    let movements = List.map parse_input lines in

    Printf.printf "Exercise 1: %d\n" (exercise_1 movements);
    Printf.printf "Exercise 2: %d\n" (exercise_2 movements);
