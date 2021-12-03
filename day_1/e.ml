let file_name = "input.txt"

let read_lines file_name : string list =
  let ic = open_in file_name in
  let try_read () =
    try Some (input_line ic) with End_of_file -> None in
  let rec loop acc = match try_read () with
    | Some s -> loop (s :: acc)
    | None -> close_in ic; List.rev acc in
  loop []

let () =
    let rec exercise_1 = function
      | x0 :: x1 :: rest ->
        (if x0 < x1 then 1 else 0) + (exercise_1 ([x1] @ rest))
      | _ -> 0
    in

    let exercise_2 =
      let sum = List.fold_left (+) 0 in
      let rec count = function
        | x0 :: x1 :: x2 :: x3 :: rest ->
          (if (sum [x0; x1; x2]) < (sum [x1; x2; x3]) then 1 else 0) + (count ([x1; x2; x3] @ rest))
        | _ -> 0
      in
      count
    in

    let lines = read_lines file_name in
    let measurements = List.map int_of_string lines in

    Printf.printf "Exercise 1: %d\n" (exercise_1 measurements);
    Printf.printf "Exercise 2: %d\n" (exercise_2 measurements);
