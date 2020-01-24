package main

/*
typedef void (*callback) (int);

static inline void bridge_callback_func(int result,callback f)
{
	f(result);
}

*/
import "C"
import (
	"fmt"
)

func crunchNumbers(numbers []int) int {
	results := make(chan int)
	sum := 0
	for _, value := range numbers {

		go func(n int) {
			fmt.Printf("Processing on Go couroutine %d \n", n)
			results <- n
		}(value)
	}

	for i := 0; i < len(numbers); i++ {
		select {
		case num := <-results:
			sum += num
		}
	}

	return sum
}

func main() {

}

//export Test
func Test(cb C.callback) {
	numbers := []int{2, 3, 4, 5}
	result := C.int(crunchNumbers(numbers))
	C.bridge_callback_func(result, cb)
	fmt.Println("hmmm")
}
