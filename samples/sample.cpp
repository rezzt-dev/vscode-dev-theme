// muestra de c++ para revisar el resaltado de dark dev
#include <iostream>
#include <vector>
#include <string>

namespace dark::dev {

template <typename T, std::size_t N = 4>
class Ramp : public Base<T> {
public:
    explicit Ramp(std::vector<T> steps) : steps_(std::move(steps)) {}
    virtual ~Ramp() = default;

    [[nodiscard]] constexpr auto at(std::size_t index) const noexcept -> const T& {
        return steps_.at(index);
    }

    template <typename F>
    void each(F&& fn) const {
        for (const auto& step : steps_) fn(step);
    }

private:
    std::vector<T> steps_;
};

concept Numeric = std::is_arithmetic_v<T>;

} // namespace dark::dev

int main() {
    auto ramp = dark::dev::Ramp<int>({5, 10, 20});
    ramp.each([](int v) { std::cout << v << '\n'; });
    try { throw std::runtime_error("boom"); }
    catch (const std::exception& e) { std::cerr << e.what() << "\n"; }
    int* p = new int(42);
    delete p;
    return nullptr == p ? 1 : 0;
}
